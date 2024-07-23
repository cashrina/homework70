import {ApiContact, CartContact} from '../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
  cartContacts: CartContact[];
}

const initialState: CartState = {
  cartContacts: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addDish: (state, { payload: contact }: PayloadAction<ApiContact>) => {
      const index = state.cartContacts.findIndex(
        (cartContact) => cartContact.contact.id === contact.id,
      );

      if (index !== -1) {
        state.cartContacts[index].amount++;
      } else {
        state.cartContacts.push({
          amount: 1,
          contact,
        });
      }
    },

    updateDishes: (state, { payload: dishes }: PayloadAction<ApiContact[]>) => {
      const newCartPerson: CartContact[] = [];
      state.cartContacts.forEach((cartContact: CartContact) => {
        const exitingCart = contacts.find((contact) => cartContact.contact.id === contact.id);

        if (!exitingCart) {
          return;
        }

        newCartPerson.push({
          ...cartContacts,
          dish: exitingCart,
        });
      });

      state.cartContacts = newCartPerson;
    },

    clearCart: (state) => {
      state.cartContacts = [];
    },
  },
  selectors: {
    selectCartPerson: (state) => state.cartContacts,
  },
});

export const cartReducer = cartSlice.reducer;

export const { addDish, updateDishes, clearCart } = cartSlice.actions;

export const { selectCartPerson } = cartSlice.selectors;
