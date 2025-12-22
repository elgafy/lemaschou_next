import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface ApiData {
  status: boolean;
  message: string;
  data: {
    image: string;
    type: string;
  }[];
}

// Async thunk for API fetching
export const fetchData = createAsyncThunk("data/fetchData", async () => {
  const response = await fetch(
    "https://api.lemaschou.sa/api/settings/assets"
  );
  const data = await response.json();
  return data;
});

const assetsSlice = createSlice({
  name: "data",
  initialState: {
    apiData: null as ApiData | null,
    status: "idle", // idle, loading, succeeded, failed
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.apiData = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export const AssetsSlice = assetsSlice.reducer;
