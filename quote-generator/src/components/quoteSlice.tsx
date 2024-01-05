import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/index";

interface InitialStateType {
  id: string;
  quote: string;
  author: string;
  tags: string[];
  forceRefetch: boolean;
}

// Define the initial state using that type
const initialState: InitialStateType = {
  id: "",
  quote: "",
  author: "",
  tags: [],
  forceRefetch: false,
};

export const quoteSlice = createSlice({
  name: "quotes",
  initialState,
  reducers: {
    setId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setQuote: (state, action: PayloadAction<string>) => {
      state.quote = action.payload;
    },
    setAuthor: (state, action: PayloadAction<string>) => {
      state.author = action.payload;
    },
    setNewTag: (state, action: PayloadAction<string>) => {
      state.tags = [...state.tags, action.payload];
    },
    setForceRefetch: (state, action: PayloadAction<boolean>) => {
      state.forceRefetch = action.payload;
    },
  },
});

export const { setId, setAuthor, setQuote, setNewTag, setForceRefetch } =
  quoteSlice.actions;

export const selectCurrentId = (state: RootState) => state.quotes.id;
export const selectCurrentQuote = (state: RootState) => state.quotes.quote;
export const selectCurrentAuthor = (state: RootState) => state.quotes.author;
export const selectCurrentTags = (state: RootState) => state.quotes.tags;
export const selectForceRefetch = (state: RootState) =>
  state.quotes.forceRefetch;

export default quoteSlice.reducer;
