/**
 * @deprecated Use the useHttp hook instead.Since we use C# backend, this function is not needed.
 */
export async function fetchAvailableMeals() {
  const response = await fetch("http://localhost:3000/meals");
  const resData = await response.json();
  if (!response.ok) {
    // @ts-ignore
    throw new Error("Failed to fetch places.");
  }
  return resData;
}

/**
 * @deprecated Use the useHttp hook instead.Since we use C# backend, this function is not needed.
 */
export async function placeOrder(items, customerData) {
  const response = await fetch(`http://localhost:3000/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // the body must follow the same structure as the server expects
    body: JSON.stringify({
      order: {
        items: items,
        customer: customerData,
      },
    }),
  });
  const resData = await response.json();
  if (!response.ok) {
    // @ts-ignore
    throw new Error("Failed to place order.");
  }
  return resData.message;
}
