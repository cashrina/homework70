import {configureStore, Store} from '@reduxjs/toolkit';
import { cartReducer } from '../store/cartSlice';
import { contactReducer } from '../store/contactSlice';

export const store: Store = configureStore({
  reducer: {
    cart: cartReducer,
    dishes: contactReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;