import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useInjectContext from "../hooks/useGlobalReducer";

export const AddContact = () => {
    const { store, dispatch } = useInjectContext();
    const navigate = useNavigate();

    // obtener el usuario actual
    const { currentUser } = store;

    // states del formulario
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    // función para manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        const newContact = {
            name: fullName,
            email: email,
            phone: phone,
            address: address
        };

        fetch(`https://playground.4geeks.com/contact/agendas/${currentUser.slug}/contacts`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newContact)
        })
            .then(res => res.json())
            .then(data => {
                dispatch({ type: "ADD_CONTACT", payload: data });
                navigate("/agenda");
            })
            .catch(err => console.error(err));
    };

    return (
        // Formulario para agregar un nuevo contacto
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 neumorphic-form p-5">
                    <h2 className="text-center mb-4 text-dark">New Contact</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 text-start">Full Name:
                            <label className="form-label ms-2"></label>
                            <input
                                type="text"
                                className="form-control neumorphic-input"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3 text-start">
                            <label className="form-label ms-2">Mail</label>
                            <input
                                type="email"
                                className="form-control neumorphic-input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3 text-start">
                            <label className="form-label ms-2">Phone</label>
                            <input
                                type="text"
                                className="form-control neumorphic-input"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4 text-start">
                            <label className="form-label ms-2">Address</label>
                            <input
                                type="text"
                                className="form-control neumorphic-input"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="neumorphic-button w-100 py-2 mb-3 icon">
                            Save Contact
                        </button>
                        <Link to="/agenda" className="btn d-block text-center text-secondary mt-3 fs-5 icon">
                            <i class="bi bi-arrow-left-short"></i> Back to the agenda
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};