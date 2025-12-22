import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IPathState {
  AdPathsState: {
    id: string;
    link: string;
    numbersOfViews: number;
  }[];
}

const initialState: IPathState = {
  AdPathsState: [],
};

export const PathSlice = createSlice({
  name: "pathsOfAd",
  initialState,
  reducers: {
    setAdPaths: (
      state,
      action: PayloadAction<{
        payload: {
          id: string;
          link: string;
          numbersOfViews: number;
        };
      }>
    ) => {
      if (
        !state.AdPathsState.find(
          (item) => item.id === action.payload.payload.id
        )
      ) {
        state.AdPathsState.push(action.payload.payload);
      }
    },
    clearAdPaths: (state) => {
      state.AdPathsState = [];
    },
    setDecreaseViews: (
      state,
      action: PayloadAction<{
        payload: {
          id: string;
        };
      }>
    ) => {
      state.AdPathsState.map((item) => {
        if (item.id === action.payload.payload.id && item.numbersOfViews > 0) {
          item.numbersOfViews--;
        }
      });
    },
  },
});

export const { setAdPaths, setDecreaseViews, clearAdPaths } = PathSlice.actions;
export const AdPathsReducer = PathSlice.reducer;
