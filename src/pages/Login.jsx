import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useInjectContext from "../hooks/useGlobalReducer";

export const Login = () => {

    // Estado para el nombre de usuario
    const [username, setUsername] = useState("");
    const { dispatch } = useInjectContext();

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        // nombre en pantalla
        const displayName = username.trim();

        // slug para api
        const slug = displayName.replace(/\s+/g, "").toLowerCase();

        // Validar que el slug no esté vacío
        if (!slug) return alert("Please enter a valid username.");

        try {
            // Usamos el SLUG para consultar la API
            const resp = await fetch(`https://playground.4geeks.com/contact/agendas/${slug}`);

            // Si la respuesta es 404, significa que el usuario no existe, así que lo creamos
            if (resp.status === 404) {
                await fetch(`https://playground.4geeks.com/contact/agendas/${slug}`, { method: "POST" });
            }

            // Actualizar el estado global con el name del usuario y el slug
            dispatch({
                type: "SET_USER",
                payload: {
                    name: displayName,
                    slug: slug
                }
            });

            // Navegar a la página de la agenda
            navigate("/agenda");

        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-start vh-100">
            <div className="text-center p-5 neumorphic-form" style={{ maxWidth: "80vh", width: "100%" }}>
                <h1 className="mb-4 fw-bold">Welcome</h1>
                <p className="text-muted mb-4">Enter your username to access your agenda</p>

                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        className="form-control neumorphic-input mb-4 text-center"
                        placeholder="Ex: Jhon Doe"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <button type="submit" className="neumorphic-button w-100 fw-bold">
                        Login / Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};