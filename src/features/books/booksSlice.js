import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [],
  cart: [],
  cartCount: 0,
  total: 0
}

const booksSlice = createSlice({
  name: "Books",
  initialState,
  reducers: {
    loadAllBooks: (state, action) => {
      state.books = action.payload
    },
    addToCart: (state, action) => {
      const { _id, title, author, coverImage, price, description, reviews, ratings, qty } = action.payload;
      const tempCart = state.cart.find(i => i._id === _id);
      if(tempCart){
        tempCart.qty += qty || 1
      }else{
        state.cart.push({ _id, title, author, coverImage, price, description, reviews, ratings, qty: qty || 1 });
      }
    }
  }
});

export const {
  loadAllBooks,
  addToCart

} = booksSlice.actions;
export default booksSlice.reducer;