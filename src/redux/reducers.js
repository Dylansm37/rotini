// to manage the state of the cart

const initialState = {
    cart: [],
  };
  
  // add/remove
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case "ADD_ITEM":
        return {
          ...state,
          cart: [...state.cart, action.payload],
        };
      case "REMOVE_ITEM":
        return {
          ...state,
          cart: state.cart.filter(item => item.id !== action.payload),
        };
      default:
        return state;
    }
  };
  
  export default cartReducer;
  