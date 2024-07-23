import {
    createContact,
    deleteContacts,
    fetchContacts,
    fetchOneContact,
    updateContact,
} from "./contactThunks.ts";
import {ApiContact} from "../types.ts";
import {createSlice} from "@reduxjs/toolkit";

interface ContactsState {
    items: ApiContact[];
    fetchLoading: boolean;
    deleteLoading: false | string;
    createLoading: boolean;
    updateLoading: boolean;
    fetchOneLoading: boolean;
    oneContacts: null | ApiContact;
}

const initialState: ContactsState = {
    items: [],
    fetchLoading: false,
    deleteLoading: false,
    createLoading: false,
    updateLoading: false,
    fetchOneLoading: false,
    oneContacts: null,
};

export const contactSlice = createSlice({
    name: "contacts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchContacts.pending, (state, { payload: items }) => {
                state.fetchLoading = false;
                state.items = items;
            })
            .addCase(fetchContacts.rejected, (state) => {
                state.fetchLoading = false;
            });
        builder
            .addCase(deleteContacts.pending, (state, { meta: { arg: contactId } }) => {
                state.deleteLoading = contactId;
            })
            .addCase(deleteContacts.fulfilled, (state) => {
                state.deleteLoading = false;
            })
            .addCase(deleteContacts.rejected, (state) => {
                state.deleteLoading = false;
            });
        builder
            .addCase(createContact.pending, (state) => {
                state.createLoading = true;
            })
            .addCase(createContact.fulfilled, (state) => {
                state.createLoading = false;
            })
            .addCase(createContact.rejected, (state) => {
                state.createLoading = false;
            });
        builder
            .addCase(fetchOneContact.pending, (state) => {
                state.oneContacts = null;
                state.fetchOneLoading = true;
            })
            .addCase(fetchOneContact.fulfilled, (state, { payload: apiContact }) => {
                state.oneContacts = apiContact;
                state.fetchOneLoading = false;
            })
            .addCase(fetchOneContact.rejected, (state) => {
                state.fetchOneLoading = false;
            });
        builder
            .addCase(updateContact.pending, (state) => {
                state.updateLoading = true;
            })
            .addCase(updateContact.fulfilled, (state) => {
                state.updateLoading = false;
            })
            .addCase(updateContact.rejected, (state) => {
                state.updateLoading = false;
            });
    },
    selectors: {
        selectContact: (state) => state.items,
        selectFetchContactLoading: (state) => state.fetchLoading,
        selectDeleteContactLoading: (state) => state.deleteLoading,
        selectCreateContactLoading: (state) => state.createLoading,
        selectFetchOneContactLoading: (state) => state.fetchOneLoading,
        selectUpdateContactLoading: (state) => state.updateLoading,
        selectOneContact: (state) => state.oneContacts,
    },
});

export const contactReducer = contactSlice.reducer;

export const {
    selectContact,
    selectFetchContactLoading,
    selectDeleteContactLoading,
    selectCreateContactLoading,
    selectFetchOneContactLoading,
    selectUpdateContactLoading,
    selectOneContact,
} = contactSlice.selectors;