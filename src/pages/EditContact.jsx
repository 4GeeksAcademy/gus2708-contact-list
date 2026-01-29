import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import useInjectContext from "../hooks/useGlobalReducer";



export const EditContact = () => {
    const { id } = useParams(); // Sacamos el ID de la URL
    const { store, dispatch } = useInjectContext();
    const navigate = useNavigate();

    // obtener el usuario actual
    const { currentUser } = store;


    const [formData, setFormData] = useState({
        name: "", email: "", phone: "", address: ""
    });

    // 1. Buscar los datos actuales del contacto para rellenar el formulario
    useEffect(() => {
        const contactToEdit = store.contacts.find(c => c.id === parseInt(id));
        if (contactToEdit) {
            setFormData(contactToEdit);
        }
    }, [id, store.contacts]);

    const handleUpdate = (e) => {
        e.preventDefault();
        fetch(`https://playground.4geeks.com/contact/agendas/${currentUser.slug}/contacts/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => {
                dispatch({ type: "UPDATE_CONTACT", payload: data });
                navigate("/agenda");
            });
    };

    return (
        <div className="container mt-5">
            <div className="neumorphic-form p-5 mx-auto" style={{ maxWidth: "37.5rem" }}>
                <h2 className="text-center mb-4">Edit contact</h2>
                <form onSubmit={handleUpdate}>
                    <input
                        className="form-control neumorphic-input mb-3"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Name"
                    />
                    <input
                        className="form-control neumorphic-input mb-3"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Email"
                    />
                    <input
                        className="form-control neumorphic-input mb-3"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Phone"
                    />
                    <input
                        className="form-control neumorphic-input mb-3"
                        value={formData.address}
                        onChange={e => setFormData({ ...formData, address: e.target.value })}
                        placeholder="Address"
                    />
                    <button type="submit" className="neumorphic-button w-100 mt-3 icon">
                        Update Changes
                    </button>
                    <Link to="/agenda" className="btn d-block text-center text-secondary mt-3 fs-5 icon">
                        <i class="bi bi-arrow-left-short"></i> Back to the agenda
                    </Link>
                </form>
            </div>
        </div>
    );
};