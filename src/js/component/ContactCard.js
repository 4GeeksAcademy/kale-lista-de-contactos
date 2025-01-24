import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { faEnvelope, faLocationDot, faPencilAlt, faPhoneFlip, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useActionData, useNavigate } from "react-router-dom";
import { ModalEliminacion } from "./ModalEliminacion"; 


export const ContactCard = (props) => {
	const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [contactId, setContactId] = useState(null);

    const openModal = (id) => {
        setContactId(id);
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    const HandlerDelete = async (id) => {
        if (contactId) {
            await actions.deleteContact(id);
        }
        closeModal();
        await actions.getContactsList();
    };

	return (
        <div className="container justify-content-center ">
            <div className="row">
                {store.contacts.length > 0 ? (
                    store.contacts.map((contact, index) => (
                        <div className="row border border-1 p-2" key={index}>
                            <div className="col-md-1 col-sm-6 me-5 ">
                                <img src="https://picsum.photos/id/423/200/300" width="100" height="100"/>
                            </div>
                            <div className="col-md-6 col-sm-6">
                                <h5>{contact.name}</h5>
                                <ul className="list-group border-none d-flex align-items-start flex-column p-0" style={{ listStyle: 'none' }}>
                                    <li>
                                        <span><FontAwesomeIcon icon={faLocationDot} className="locationICON me-2" />{contact.address}</span> 
                                    </li>
                                    <li>
                                        <span><FontAwesomeIcon icon={faPhoneFlip} className="phoneICON me-2" />{contact.phone}</span> 
                                    </li>
                                    <li>
                                        <span><FontAwesomeIcon icon={faEnvelope} className="emailICON me-2" />{contact.email}</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-4 col-sm-4">
                                <div className="text-end">
                                    <Link to={`/update/${contact.id}`}>
                                        <FontAwesomeIcon icon={faPencilAlt} className="editBTN me-5" onClick={() => handleEdit(contact.id)}  />
                                    </Link>
                                    <FontAwesomeIcon icon={faTrashAlt} className="deleteBTN me-2" onClick={ () => openModal(contact.id)} />
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12">
                        <p className="list-group-item">No hay contactos disponibles.</p>
                    </div>
                )}
            </div>
            <ModalEliminacion showModal={showModal} handlerClose={closeModal} handlerDelete ={ () => {HandlerDelete(contactId)} }/>
        </div>
	);
};

ContactCard.propTypes = {
	fullName: PropTypes.string,
	email: PropTypes.string,
	phone: PropTypes.number,
	address: PropTypes.string,
};
