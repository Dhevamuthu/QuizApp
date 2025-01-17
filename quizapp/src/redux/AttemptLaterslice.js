import { createSlice } from "@reduxjs/toolkit";

const AttemptLaterSlice = createSlice({
  name: "cart",
  initialState: {
    quantity: 0,
    cart: [],
  },
  reducers: {
    addtocart: (state, action) => {
      const itemInCart = state.cart.find((item) => item.lid === action.payload.lid);
      if (!itemInCart) {
        state.cart.push({ ...action.payload });
        state.quantity += 1; // Increment the quantity when an item is added
      } 
    },
    
    removeitem: (state, action) => {
      const newCart = state.cart.filter((item) => item.lid !== action.payload);
      console.log(newCart,action.payload);
      state.cart = newCart;
      state.quantity -= 1; // Decrement the quantity when an item is removed
    },
  },
});

export const { addtocart, removeitem } = AttemptLaterSlice.actions;
export default AttemptLaterSlice.reducer;
