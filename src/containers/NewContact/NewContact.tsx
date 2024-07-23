import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {ApiContact} from "../../types.ts";
import {toast} from "react-toastify";
import ContactForm from "../../components/ContactForm/ContactForm.tsx";
import {createContact} from "../../store/contactThunks.ts";
import { selectCreateContactLoading } from '../../store/contactSlice.ts';

const NewContact = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isCreating = useAppSelector(selectCreateContactLoading);

    const onSubmit = async (contact: ApiContact) => {
        try {
            await dispatch(createContact(contact)).unwrap();
            navigate('/');
            toast.success("Contact created successfully.");
        } catch (error) {
            toast.error('Something went wrong.');
        }
    };

    return (
        <div className="row mt-2">
            <div className="col">
                <ContactForm onSubmit={onSubmit} isLoading={isCreating}/>
            </div>
        </div>
    );
};

export default NewContact;