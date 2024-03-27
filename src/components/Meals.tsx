import { currencyFormatter } from "../util/formatting.ts";
import Button from "../UI/Button.tsx";
import { useContext } from "react";
import { CartContext } from "../store/CartContext.tsx";
const url = "http://localhost:5013";
export default function Meals({ meals, isLoading, loadingText, fallbackText }) {
  const { addItemToCart } = useContext(CartContext);
  return (
    <>
      {isLoading && (
        <div className={"mx-auto text-center border-b-orange-700"}>
          <p className={"text-red-600"}>{loadingText}</p>
        </div>
      )}
      {!isLoading && meals.length === 0 && (
        <div className={"mx-auto text-center border-b-orange-700"}>
          <p className={"text-red-600"}>{fallbackText}</p>
        </div>
      )}
      {!isLoading && meals.length > 0 && (
        <ul id={"meals"}>
          {meals.map((meal) => (
            <li key={meal.id} className={"meal-item"}>
              <article>
                <img src={`${url}/${meal.image}`} alt={meal.image} />
                <div>
                  <h3> {meal.name}</h3>
                  <p className={"meal-item-price"}>
                    {currencyFormatter.format(meal.price)}
                  </p>
                  <p id="meal-item-description">{meal.description}</p>
                </div>
                <p className={"meal-item-actions"}>
                  <Button
                    className={"button"}
                    textOnly={false}
                    onClick={() => addItemToCart(meal)}
                  >
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
