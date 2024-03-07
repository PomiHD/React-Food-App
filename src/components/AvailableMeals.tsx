import { useEffect, useState } from "react";
import { fetchAvailableMeals } from "../htpp.ts";

export default function AvailableMeals() {
  const [isFecthing, setIsFetching] = useState(false);
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
    return (
      <div>
        <h2>"An error occured!"</h2>
        <p>{error.message}</p>
        {
          <div>
            <button>Okay</button>
          </div>
        }
      </div>
    );
  }
  return (
    <>
      {!isFecthing && availableMeals.length > 0 && (
        <div>
          <ul id={"meals"}>
            {availableMeals.map((meal) => (
              <li key={meal.id} className={"meal-item"}>
                <img
                  src={`http://localhost:3000/${meal.image}`}
                  alt={meal.image}
                />
                <h3> {meal.name}</h3>
                <p> ${meal.price}</p>
                <p id="meal-item-description">{meal.description}</p>
                <button className={"meal-item-actions"}>Add</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
