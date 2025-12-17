import { createSlice } from '@reduxjs/toolkit';

const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];

const initialState = {
  cartItems: savedCart,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const exist = state.cartItems.find(
        i=>i.id ===item.id
      );
      if (exist) {
        exist.quantity += 1;
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    incrementQty: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item) item.quantity += 1;

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decrementQty: (state, action) => {
  const item = state.cartItems.find((item) => item.id === action.payload);
  // if (item) {
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      alert("Quantity cannot go below 1.");
    }
    localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
  // }
}

   
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQty,
  decrementQty,
  // clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

