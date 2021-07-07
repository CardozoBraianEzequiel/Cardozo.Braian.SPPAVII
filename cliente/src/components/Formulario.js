import React, { useEffect, useState } from 'react';

// formulario inicial.
const frmInicial = {
    id: null,
    nombre: '',
    edad: '',
    especialidad: '',
    favorito: false,
    cantidadDeCapitulos : '',
};


const Formulario = ({ altaCocinero, modificarCocinero, editado, setEditado }) => {

    const [form, setForm] = useState(frmInicial);

    const { nombre, edad, especialidad, favorito, cantidadDeCapitulos } = form;

    useEffect(() => {

        if (editado) {
            setForm(editado);
        }

        else {
            setForm(frmInicial);
        }

    }, [editado]);


    const handlerChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handlerSubmit = (e) => {
        e.preventDefault();

        if (nombre.trim() === "" || especialidad.trim() === "") {
            alert("Datos incompletos");
            return;
        }

        if (edad < 18 || edad > 65 || isNaN(edad))
        {
            alert("Hay un error con la edad. Vuelva a intentarlo");
            return;
        }

        if (cantidadDeCapitulos < 1 || cantidadDeCapitulos > 100 || isNaN(cantidadDeCapitulos))
        {
            alert("La cantidad de capitulos debe ser entre 1 y 100");
            return;
        }


        editado ? modificarCocinero(form) : altaCocinero(form);

        handlerReset();
    }

    const handlerReset = (e) => {
        setForm(frmInicial);
        setEditado(null);
    }


    const handlerFav = (e) => {

        if (e.target.value === "Favorito") {
            setForm({ ...form, favorito: true });
        }
        else {
            setForm({ ...form, favorito: false });
        }
    }



    return (

        <div className="contenedor-form">

            <form onSubmit={handlerSubmit}>

                <div className="divColumna">
                    <input type="text" name="nombre" placeholder="Ingrese su nombre" onChange={handlerChange} value={nombre} />
                    <input type="text" name="edad" placeholder="Ingrese su edad" onChange={handlerChange} value={edad} />
                    <input type="text" name="especialidad" placeholder="Ingrese su especialidad" onChange={handlerChange} value={especialidad} />
                    <input type="text" name="cantidadDeCapitulos" placeholder="Ingrese cantidad de capitulos" onChange={handlerChange} value={cantidadDeCapitulos} />
                <fieldset>
                    <legend>Favorito: </legend>
                    <input type="radio" name="favorito" value="Favorito" onChange={handlerFav} checked={favorito === true} /> Favorito
                    <input type="radio" name="favorito" value="NoFavorito" onChange={handlerFav} checked={favorito === false} /> No Favorito
                </fieldset>

                </div>

                <input type="submit" value={editado ? "Modificar cocinero" : "Alta cocinero"} onClick={handlerSubmit} />
                <input type="reset" value="Limpiar" onClick={handlerReset} />

            </form>

        </div>

    );
}

export default Formulario;