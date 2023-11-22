import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ExtractedInvoiceState {
  extractedIds: number[];
}

const initialState: ExtractedInvoiceState = {
  extractedIds: [],
};

const extractedInvoiceSlice = createSlice({
  name: "extractedInvoices",
  initialState,
  reducers: {
    setExtractedIds: (state, action: PayloadAction<number[]>) => {
      state.extractedIds = action.payload;
    },
  },
});

export const { setExtractedIds } = extractedInvoiceSlice.actions;
export default extractedInvoiceSlice.reducer;
