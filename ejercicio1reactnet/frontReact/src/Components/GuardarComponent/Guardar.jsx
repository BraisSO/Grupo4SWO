import axios from 'axios';
import { useState } from 'react';
import "./Guardar.css"

//REPARAR ESTO, SOLO DETECTA O ULTIMO VALOR ENVIADO

export default function Guardar() {
const [clientes, setClientes] = useState ({
nombre: '',
correo: ''
});

function handleSubmit(e){
    e.preventDefault();
    axios.post('https://jsonplaceholder.typicode.com/posts', clientes)
    .then(res => {
        console.log(res.data.nombre);
        console.log(res.data.correo);
    });
}

    return (
        <div className="globalGuardar">
            <h2>Guardar un usuario</h2>
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                name="nombre" 
                placeholder='nombre'
                value={clientes.nombre}
                onChange={e => setClientes({ nombre: e.target.value })} 
            ></input>
            <input 
                type="text" 
                name="correo"
                placeholder='correo'
                value={clientes.correo}
                onChange={e => setClientes({ correo: e.target.value })}>
            </input>
                <button type="submit">Submit</button>
            </form>
            </div>
            );
    }
