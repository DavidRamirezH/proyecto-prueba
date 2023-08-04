import React, { useEffect, useState } from "react";
import Tarjetas from "../components/tarjetas/tarjetaComponent";
import './Home.css';

export default function Home() {
    const [user, setUser] = useState(null);

    const api = async () => {
        try {
            const data = await fetch('https://rickandmortyapi.com/api/character');
            const resp = await data.json();
            const valorAleatorio = Math.floor(Math.random() * 20);
            const usuario = resp.results[valorAleatorio];
            setUser(usuario); // Establecer el usuario después de obtener la respuesta de la API
        } catch (error) {
            console.error('Error al obtener los datos del usuario:', error);
            setUser(null); // En caso de error, puedes establecer el usuario como null
        }
    };

    useEffect(() => {
        api();
    }, []);

    if (!user) {
        return <div>Cargando...</div>;
    }

    return (
        <main className="contenedor-principal">
            <Tarjetas user={user}></Tarjetas>
        </main>
    );
}