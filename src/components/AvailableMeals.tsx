import Meals from "./Meals.tsx";
import useHttp from "../hooks/useHttp.tsx";
import { ErrorMessage } from "./ErrorMessage.tsx";

const url = "http://localhost:5013/api/Meals";
export default function AvailableMeals() {
  const { data: availableMeals, isLoading: isFetching, error } = useHttp(url);

  // if (isFetching) {
  //   return <p className="center">Fetching meals...</p>;
  // }

  if (error) {
    return <ErrorMessage title="Failed to fetch meals" message={error} />;
  }
  return (
    <Meals
      meals={availableMeals || []}
      isLoading={isFetching}
      loadingText="Loading meals data..."
      fallbackText="No meals available."
    />
  );
}
