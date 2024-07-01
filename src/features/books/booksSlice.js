import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: []
}

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    getAllBooks: (state, action) => {
      state.books = action.payload
    }
  }
});

export const {
  getAllBooks,

} = booksSlice.actions;
export default booksSlice.reducer;