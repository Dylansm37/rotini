// To manage the cart item
export const addItemToCart = (item) => ({
    type: "ADD_ITEM",
    payload: item,
  });
  
  // Action to remove an item from the cart
  export const removeItemFromCart = (itemId) => ({
    type: "REMOVE_ITEM",
    payload: itemId,
  });
  