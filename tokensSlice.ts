import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Token, TokenStatus } from "@/lib/types";

interface TokensState {
  items: Token[];              // all tokens
  filter: "ALL" | TokenStatus; // current filter
  sortBy: "name" | "price" | "change" | "volume" | null;
  sortDir: "asc" | "desc";
}

const initialState: TokensState = {
  items: [],
  filter: "ALL",
  sortBy: null,
  sortDir: "asc",
};

export const tokensSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {

    setTokens: (state, action: PayloadAction<Token[]>) => {
      state.items = action.payload;
    },

    upsertToken: (state, action: PayloadAction<Token>) => {
      const token = action.payload;
      const index = state.items.findIndex((t) => t.id === token.id);
      if (index >= 0) {
        state.items[index] = token;
      } else {
        state.items.push(token);
      }
    },

    filterTokens: (state, action: PayloadAction<"ALL" | TokenStatus>) => {
      state.filter = action.payload;
    },

    // ---------- SORTING LOGIC ----------
    sortTokens: (
      state,
      action: PayloadAction<"name" | "price" | "change" | "volume">
    ) => {
      const field = action.payload;

      // toggle direction if same column clicked
      if (state.sortBy === field) {
        state.sortDir = state.sortDir === "asc" ? "desc" : "asc";
      } else {
        state.sortBy = field;
        state.sortDir = "asc";
      }

      const dir = state.sortDir === "asc" ? 1 : -1;

      state.items = [...state.items].sort((a, b) => {
        switch (field) {
          case "name":
            return a.name.localeCompare(b.name) * dir;
          case "price":
            return (a.price - b.price) * dir;
          case "change":
            return (a.priceChange24h - b.priceChange24h) * dir;
          case "volume":
            return (a.volume24h - b.volume24h) * dir;
          default:
            return 0;
        }
      });
    },
  },
});

export const {
  setTokens,
  upsertToken,
  filterTokens,
  sortTokens
} = tokensSlice.actions;

export default tokensSlice.reducer;
