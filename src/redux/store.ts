// store.ts

import { configureStore } from '@reduxjs/toolkit';
import invoiceReducer from './invoiceSlice';
import extractedInvoiceReducer from './extractedInvoiceSlice';

const store = configureStore({
  reducer: {
    invoices: invoiceReducer,
    extractedInvoices: extractedInvoiceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
