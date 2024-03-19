import { currencyFormatter } from "../util/formatting.ts";
export default function Meals({ meals, isLoading, loadingText, fallbackText }) {
  return (
    <>
      {" "}
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
                <h3> {meal.name}</h3>
                <p className={"meal-item-price"}>
                  {" "}
                  {currencyFormatter.format(meal.price)}
                </p>
                <p id="meal-item-description">{meal.description}</p>
                <button className={"button"}>Add</button>
              </article>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
