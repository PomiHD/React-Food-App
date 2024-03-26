import { Error } from "./Error.tsx";
import Meals from "./Meals.tsx";
import useHttp from "../hooks/useHttp.tsx";

const requestConfig = {}; // to prevent loop in sendRequest due to useCallBack
const url = "http://localhost:3000/meals";
export default function AvailableMeals() {
  const {
    data: availableMeals,
    isLoading: isFetching,
    error,
  } = useHttp(url, requestConfig, []); // [] to prevent undefined error

  if (error) {
    return <Error title={"An error occured!"} message={error.message} />;
  }
  return (
    <>
      <Meals
        meals={availableMeals}
        isLoading={isFetching}
        loadingText="Loading meals data..."
        fallbackText="No meals available."
      />
    </>
  );
}
