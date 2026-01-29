import React, { useEffect, useContext } from "react";
import useInjectContext from "../hooks/useGlobalReducer";
import { Link } from "react-router-dom";


export default function Home() {

	const context = useInjectContext();

	// Manejo de carga del contexto global
	if (!context || !context.store) {
		return (
			<div className="container mt-5 text-center">
				<div className="spinner-border text-primary" role="status">
					<span className="visually-hidden">Loading...</span>
				</div>
				<p className="mt-2">Connecting to the database...</p>
			</div>
		);
	}

	// Desestructurar store y dispatch del contexto
	const { store, dispatch } = context || { store: { contacts: [] } };

	// Obtener la lista de contactos del estado global y manejar el caso en que store o store.contacts puedan ser undefined
	const { contacts, currentUser } = store;

	// useEffect para cargar los contactos al montar el componente
	useEffect(() => {
		// Cargar contactos del usuario actual
		if (currentUser && dispatch) {
            fetch(`https://playground.4geeks.com/contact/agendas/${currentUser.slug}/contacts`)
                .then((res) => res.json())
                .then((data) => {
                    const list = data.contacts || [];
                    dispatch({ type: "SET_CONTACTS", payload: list });
                });
        }
	}, [dispatch, currentUser]);

	if (!currentUser) {
        return (
            <div className="container mt-5 text-center">
                <h3>Please log in to view your contacts.</h3>
                <a href="/" className="btn btn-primary mt-3">Go to Login</a>
            </div>
        );
    }

	// Manejo de carga del store o store.contacts
	if (!store || !store.contacts) {
		return <div className="container mt-5">Loading tools from the store...</div>;
	}

	// Función para manejar la eliminación de un contacto
	const handleDelete = (id) => {
    // Confirmación rápida
    if (confirm("¿are you sure you want to delete this contact?")) {
        fetch(`https://playground.4geeks.com/contact/agendas/${currentUser.slug}/contacts/${id}`, {
            method: "DELETE"
        })
        .then(res => {
            if (res.ok) {
                // Si la API lo borró, lo quitamos de la pantalla
                dispatch({ type: "DELETE_CONTACT", payload: id });
            }
        })
        .catch(err => console.error(err));
    }
};

	return (
		<div className="container">
			<div className="row">
				{contacts.map((contact) => (
					<div key={contact.id} className="col-md-4 mb-3 mt-4">
						<div className="card neumorphic-card p-3 h-100">
							<div className="card-body text-center">
								<h5 className="card-title fw-bold text-dark fs-2">{contact.name}</h5>
								<p className="card-text text-secondary mb-2">{contact.email}</p>
								<p className="card-text text-secondary fs-3">+{contact.phone}</p>
								<div className="d-flex justify-content-center gap-2 mt-2">
									<Link to={`/edit-contact/${contact.id}`} className="btn neumorphic-button-contact icon fs-4"><i class="bi bi-pencil-fill"></i></Link>
									<button 
										className="btn icon fs-4 neumorphic-button-contact"
										onClick={() => handleDelete(contact.id)}
										>
											<i class="bi bi-trash-fill"></i>
									</button>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}