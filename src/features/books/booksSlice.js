import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [],
  cart: [],
  searchResults: [],
  cartCount: 0,
  amount: 0,
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
    },
    clearCart: (state) => {
      state.cart = []
    },
    removeBook: (state, action) => {
      const bookId = action.payload;
      state.cart = state.cart.filter(item => item._id !== bookId)
    },
    increase: (state, action) => {
      const bookId = action.payload;
      const tempBook = state.cart.find(item => item._id === bookId);
      tempBook.qty = tempBook.qty + 1;
    },
    decrease: (state, action) => {
      const bookId = action.payload;
      const tempBook = state.cart.find(item => item._id === bookId);
      tempBook.qty = tempBook.qty - 1;
    },
    calculateTotal: (state) => {
      let amount = 0;
      let price = 0;
      state.cart.forEach(item => {
        amount += item.qty;
        price += item.qty * item.price
      });
      state.amount = amount;
      state.total = price;
    },
    searchCartByName: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      state.searchResults = state.books.filter(book => book.title.toLowerCase().includes(searchTerm) || book.author.toLowerCase().includes(searchTerm));
      state.books = state.searchResults;
    }
  }
});

export const {
  loadAllBooks,
  addToCart,
  clearCart,
  removeBook,
  increase,
  decrease,
  calculateTotal,
  searchCartByName
} = booksSlice.actions;
export default booksSlice.reducer;