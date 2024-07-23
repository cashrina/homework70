import React, {useState} from 'react';
import {ApiContact, ApiContactMutation} from "../../types.ts";
import ButtonSpinner from "../Spinner/ButtonSpinner.tsx";

interface Props {
    onSubmit: (contact: ApiContact) => void;
    existingDish?: ApiContact;
    isLoading?: boolean;
}

const emptyState: ApiContactMutation = {
    id: '',
    name: '',
    phone: '',
    email: '',
    photoUrl: '',
}

const ContactForm: React.FC<Props> = (onSubmit,
                     existingCart,
                     isLoading = false,) => {

    const initialState: ApiContactMutation = existingCart
        ? { ...existingCart, phone: existingCart.phone.toString() }
        : emptyState;

    const [cartMutation, setCartMutation] = useState<ApiContactMutation>(initialState);

    const changeContact = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setCartMutation((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    const onFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        onSubmit({
            ...cartMutation,
            phone: parseFloat(cartMutation.phone),
        });
    };

    return (
        <form onSubmit={onFormSubmit}>
            <h4>{existingCart ? 'Edit contact' : 'Add new contact'}</h4>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input className="form-control"
                       required
                       type='text'
                       name="name"
                       value={cartMutation.name}
                       onChange={changeContact}
                />
            </div>

            <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input className="form-control"
                       required
                       type='text'
                       name="phone"
                       value={cartMutation.phone}
                       onChange={changeContact}
                />
            </div>

            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input className="form-control"
                       required
                       type='email'
                       name="email"
                       value={cartMutation.email}
                       onChange={changeContact}
                />
            </div>

            <div className="form-group">
                <label htmlFor="photoUrl">photo</label>
                <input className="form-control"
                       required
                       type="url"
                       name="photoUrl"
                       value={cartMutation.photoUrl}
                       onChange={changeContact}
                />
            </div>

            <button
                type="submit"
                className="btn btn-primary mt-2"
                disabled={isLoading}
            >
                {isLoading && <ButtonSpinner/>}
                {existingCart ? 'Update' : 'Create'}
            </button>
        </form>
    );
};

export default ContactForm;