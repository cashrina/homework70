import {ApiContact} from "../types.ts";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppDispatch} from "../app/store.ts";
import axiosApi from "../axiosApi.ts";

export const fetchContacts = createAsyncThunk<
    ApiContact[],
    undefined,
    { dispatch: AppDispatch }
>('contacts/fetchContacts', async (_, thunkAPI) => {
    const dishesResponse = await axiosApi.get<ApiContact | null>('/contacts.json');
    const contacts = dishesResponse.data;

    let newContacts: ApiContact[] = [];

    if (contacts) {
        newContacts = Object.keys(contacts).map((key:string) => {
            const contact = contacts[key];
            return {
            id: key,
            ...contact,
        };
    });
    }


thunkAPI.dispatch(updateContacts(newContact));
return newContact;
});

export const deleteContacts = createAsyncThunk<void, string>(
    'contacts/deleteContacts',
    async (contactsID) => {
        await axiosApi.delete('/contacts/' + contactsID + '.json');
    },
);

export const createContact = createAsyncThunk<void, ApiContact>(
    'contacts/createContacts',
    async (apiContact) => {
        await axiosApi.post('/contacts.json', apiContact);
    },
);

export const fetchOneContact = createAsyncThunk<ApiContact, string>(
    'contacts/fetchOneContact',
    async (id) => {
        const { data: contact } = await axiosApi.get<ApiContact | null>(
            `/dishes/${id}.json`,
        );

        if (contact === null) {
            throw new Error('Not found');
        }

        return contact;
    },
);

export interface UpdateContactArg {
    id: string;
    apiContact: ApiContact;
}

export const updateContact = createAsyncThunk<void, UpdateContactArg>(
    'contacts/update',
    async ({ id, apiContact }) => {
        await axiosApi.put(`/contacts/${id}.json`, apiContact);
    },
);