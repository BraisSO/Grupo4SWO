import { useState, useEffect } from 'react';
import axios from 'axios';
import "./List.css";

export default function List() {
    const [clientes, setClientes] = useState([])

    useEffect(() => {
        axios.get("https://localhost:7015/cliente/lista-clientes")
            .then(res => setClientes(res.data))
            .catch(error => console.log(error))
    }, [])

    return (
        <div className="globalList">
            <h2>Tabla de información sobre los clientes</h2>
            <div>
                <table>
                    <thead>
                        <tr>
                            <td>Nombre</td>
                            <td>Correo</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            clientes.map((cliente, i) => {
                                return (

                                    <tr key={i}>
                                        <td>{cliente.nombre}</td>
                                        <td>{cliente.email}</td>
                                    </tr>

                                )
                            })
                        }
                        
                    </tbody>
                </table>

            </div>
        </div>

    )
}