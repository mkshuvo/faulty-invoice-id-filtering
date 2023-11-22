import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InvoiceState {
  invoices: Record<number, number>;
}

const initialState: InvoiceState = {
  invoices: {},
};

const invoiceSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    addInvoice: (state, action: PayloadAction<{ id: number; amount: number }>) => {
      const { id, amount } = action.payload;
      state.invoices[id] = amount;
    },
  },
});

export const { addInvoice } = invoiceSlice.actions;
export default invoiceSlice.reducer;
