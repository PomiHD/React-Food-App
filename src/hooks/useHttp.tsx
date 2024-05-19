import { useCallback, useEffect, useState } from "react";
import { Meal } from "../components/Meals.tsx";

/**
 * Sends an HTTP request to the specified URL with the specified configuration.
 * @param url The URL to send the request to.
 * @param config The configuration object for the request.
 * @returns A promise that resolves when the request is complete.
 * If the request is successful, the response data is returned.
 * If the request fails, an error is thrown.
 */
async function sendHttpRequest<T>(url: string, config: RequestInit) {
  const response = await fetch(url, config);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = (await response.json()) as unknown;

  return data as T;
}

type UseHttpReturn = {
  data?: Meal[];
  isLoading: boolean;
  error: string | null | undefined;
  sendRequest: (data?: any) => Promise<void>;
  clearData: () => void;
  clearError: () => void;
};

/**
 * Custom hook to handle HTTP requests.
 * @param url The URL to send the request to.
 * @param config -optional- The configuration object for the request.
 * @param initialData -optional- The initial data to set.
 * @returns An object containing the data, loading state, error state,
 * and functions to send the request, clear the data,and clear the error.
 */
export default function useHttp(
  url: string,
  config?: RequestInit,
  initialData?: any,
): UseHttpReturn {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null | undefined>();

  function clearData() {
    setData(initialData);
  }

  function clearError() {
    setError(null);
  }

  /**
   * Sends a request to the specified URL with the specified configuration.
   * @param data -optional- The data to send with the request.
   * @returns A promise that resolves when the request is complete.
   * If the request is successful, the data is set to the response data.
   * If the request fails, the error is set to the error message.
   */
  const sendRequest = useCallback(
    async function sendRequest(data?: any) {
      setIsLoading(true);
      try {
        const resData = await sendHttpRequest<Meal[]>(url, {
          ...config,
          body: data,
        });

        // TODO: Generally, we should handel the raw resData here, but in this case,
        //  we are just passing it to the component
        setData(resData);
      } catch (error: any) {
        if (error instanceof Error) {
          setError((error as Error).message);
        }
        // setError(error.message || "Something went wrong!");
        console.log(error.message);
      }
      setIsLoading(false);
    },
    [url, config],
  );

  useEffect(() => {
    if ((config && (config.method === "GET" || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData,
    clearError,
  };
}
