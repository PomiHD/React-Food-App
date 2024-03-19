import { useEffect, useState } from "react";
import { fetchAvailableMeals } from "../htpp.ts";
import { Error } from "./Error.tsx";
import Meals from "./Meals.tsx";

export default function AvailableMeals() {
  const [isFetching, setIsFetching] = useState(false);
  const [availableMeals, setAvailableMeals] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMeals() {
      setIsFetching(true);
      try {
        const fetchedMeals = await fetchAvailableMeals();
        setAvailableMeals(fetchedMeals);
        setIsFetching(false);
        console.log(fetchedMeals);
      } catch (error) {
        setError({
          message:
            error.message || "Could not fetch Meals. Please try again later.",
        });
      }
      setIsFetching(false);
    }

    fetchMeals();
  }, []);

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
