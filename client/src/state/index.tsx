import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface initialState {
    isSidebarCollapsed: boolean;
    isDarkMode: boolean;
}

const initialState: initialState = {
  isSidebarCollapsed: false,
  isDarkMode: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isSidebarCollapsed = action.payload;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
  },
});

export const { setSidebarCollapsed, setDarkMode } = globalSlice.actions;
export default globalSlice.reducer;
