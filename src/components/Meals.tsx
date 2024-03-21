import { currencyFormatter } from "../util/formatting.ts";
import Button from "../UI/Button.tsx";
export default function Meals({ meals, isLoading, loadingText, fallbackText }) {
  return (
    <>
      {isLoading && (
        <div className={"mx-auto text-center border-b-orange-700"}>
          <p className={"text-red-600"}>{loadingText}</p>
        </div>
      )}
      {!isLoading && meals.length === 0 && <p>{fallbackText}</p>}
      {!isLoading && meals.length > 0 && (
        <ul id={"meals"}>
          {meals.map((meal) => (
            <li key={meal.id} className={"meal-item"}>
              <article>
                <img
                  src={`http://localhost:3000/${meal.image}`}
                  alt={meal.image}
                />
                <div>
                  <h3> {meal.name}</h3>
                  <p className={"meal-item-price"}>
                    {currencyFormatter.format(meal.price)}
                  </p>
                  <p id="meal-item-description">{meal.description}</p>
                </div>
                <p className={"meal-item-actions"}>
                  <Button className={"button"} textOnly={false}>
                    Add to Chart
                  </Button>
                </p>
              </article>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
