import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/index";

interface InitialStateType {
  id: number;
  quote: string;
  author: string;
}

// Define the initial state using that type
const initialState: InitialStateType = {
  id: 0,
  quote: "",
  author: "",
};

export const quoteSlice = createSlice({
  name: "quotes",
  initialState,
  reducers: {
    setId: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
    },
    setQuote: (state, action: PayloadAction<string>) => {
      state.quote = action.payload;
    },
    setAuthor: (state, action: PayloadAction<string>) => {
      state.author = action.payload;
    },
  },
});

export const { setId, setAuthor, setQuote } = quoteSlice.actions;

export const selectCurrentId = (state: RootState) => state.quotes.id;
export const selectCurrentQuote = (state: RootState) => state.quotes.quote;
export const selectCurrentAuthor = (state: RootState) => state.quotes.author;

export default quoteSlice.reducer;
