import { useCallback, useEffect, useState } from "react";
async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);
  const resData = await response.json();
  if (!response.ok) {
    // @ts-ignore
    throw new Error(
      resData.message || "Something went wrong! Please try again later.",
    );
  }
  return resData;
}
export default function useHttp(url, config, initialData) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const sendRequest = useCallback(
    async function sendRequest() {
      setIsLoading(true);
      try {
        const resData = await sendHttpRequest(url, config);
        setData(resData);
      } catch (error) {
        setError(error.message || "Something went wrong!");
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
  };
}

// export default function useHttp(){
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [data, setData] = useState(null);
//     const sendRequest = useCallback(async (requestConfig, applyData) => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         const response = await fetch(requestConfig.url, {
//           method: requestConfig.method ? requestConfig.method : "GET",
//           headers: requestConfig.headers ? requestConfig.headers : {},
//           body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
//         });
//         if (!response.ok) {
//           throw new Error("Request failed!");
//         }
//         const data = await response.json();
//         applyData(data);
//       } catch (error) {
//         setError(error.message || "Something went wrong!");
//       }
//       setIsLoading(false);
//     }, []);
//     return {
//       isLoading,
//       error,
//       data,
//       sendRequest,
//     };
// }
