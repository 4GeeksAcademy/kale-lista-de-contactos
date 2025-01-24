import React, { useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLocationDot, faPencilAlt, faPhoneFlip, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar" 
import "../../styles/home.css";
import { ContactCard } from "../component/ContactCard";

export const Home = () => {
	const { store } = useContext(Context);

	return (
        <div className="container justify-content-center">
            <Navbar />
            <ContactCard />
        </div>

	);
};
