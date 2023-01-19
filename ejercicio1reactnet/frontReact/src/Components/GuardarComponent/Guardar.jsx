import axios from 'axios';
import { useState } from 'react';
import "./Guardar.css"

export default function Guardar() {
const [clientes, setClientes] = useState ({
nombre: '',
correo: ''
});

function handleSubmit(e){
    e.preventDefault();
    axios.post('https://localhost:7015/cliente/guardar', clientes)
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
                onChange={e => setClientes({ ...clientes,nombre: e.target.value })} 
            ></input>
            <input 
                type="text" 
                name="correo"
                placeholder='correo'
                value={clientes.correo}
                onChange={e => setClientes({ ...clientes,correo: e.target.value })}>  
            </input>
            {/*Hai que usar el spread operator, porque sino el objeto se 
                sobreescribe entero pasando uno de los campos a ser undefined*/}
                <button type="submit">Submit</button>
            </form>
            </div>
            );
    }
