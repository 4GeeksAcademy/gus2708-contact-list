import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useInjectContext from "../hooks/useGlobalReducer";

export const Navbar = () => {
    const navigate = useNavigate();
	const context = useInjectContext();

	// Desestructurar store y dispatch del contexto
	const { store, dispatch } = context;

	// obtener el usuario actual
	const { currentUser } = store; 

	// contar el número de contactos
	const contactCount = store.contacts ? store.contacts.length : 0;

	const handleLogout = () => {
        const confirm = window.confirm("Are you sure you want to log out?");
        if (confirm) {
            // Limpiamos el usuario y la lista en el estado global
            dispatch({ type: "SET_USER", payload: null });
            dispatch({ type: "SET_CONTACTS", payload: [] });
            
            // Mandamos al usuario de vuelta a la portada (Login)
            navigate("/");
        }
    };

	return (
		<nav className="navbar navbar-light mb-5 py-3 px-4 neumorphic-nav">
            <div className="container justify-content-between">
                
                {/* LADO IZQUIERDO: Título */}
                <Link to={store.currentUser ? "/agenda" : "/"} style={{ textDecoration: 'none' }}>
                    <span className="navbar-brand mb-0 h1 fw-bold text-dark">
                        {store.currentUser ? "My Agenda" : "Contact App"}
                    </span>
                </Link>

                {/* LADO DERECHO: Solo se muestra si hay un usuario logueado */}
                {store.currentUser && typeof store.currentUser === 'object' && currentUser.name && currentUser.slug && (
                    <div className="d-flex align-items-center gap-3">
                        
                        {/* Pantallita de Info */}
                        <div className="neumorphic-display d-none d-md-flex">
                            <span className="text-primary text-capitalize">
                                <i className="fas fa-user-circle me-2"></i>
                                {currentUser.name}
                            </span>
                            <span className="border-start border-secondary mx-2 h-100"></span>
                            <span>
                                {contactCount} {contactCount === 1 ? "Contact" : "Contacts"}
                            </span>
                        </div>

						{/* Botón de Nuevo Contacto */}
                        <Link to="/add-contact">
                            <button className="btn neumorphic-button fw-bold me-3" title="Nuevo Contacto">
                                <i className="fas fa-plus"></i> <span className="d-none d-sm-inline">New Contact</span>
                            </button>
                        </Link>

                        {/* Botón de Cerrar Sesión */}
                        <button 
                            className="btn neumorphic-btn-logout" 
                            onClick={handleLogout}
                            title="Cerrar Sesión"
                        >
                            <i className="fas fa-sign-out-alt"></i> <span className="d-none d-sm-inline">Logout</span>
                        </button>
                    </div>
                )}
            </div>
        </nav>
	);
};