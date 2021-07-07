import React, { useEffect, useState, useContext } from 'react';

// Componentes
import Formulario from '../components/Formulario';
import Header from '../components/Header';
import Tabla from '../components/Tabla';
import Loader from '../components/Loader';
import Mensaje from '../components/Mensaje';
import Logout from '../components/Logout';


const URL = "http://localhost:3006/api/cocineros/";


const ERRORINICIAL = {
  error: false,
  mensaje: "",
  bgc: ""
}


const Home = () => {


// para el spinner
const [loading, setLoading] = useState(false);

const [cocineros, setCocineros] = useState([]);

// va a ser un cocinero, que cuando hagamos click en el boton editar se carga en esta variable.
const [editado, setEditado] = useState(null);

const [error, setError] = useState(ERRORINICIAL);


useEffect(() => {

  setLoading(true);

  const getLista = async () => {

    try {
      const token = localStorage.getItem('token');
      const options = {
        method: "GET",
        headers: { "Content-type": "application/json;charset=utf-8", "Authorization" : "Bearer " + token}
      }

      const res = await fetch(URL, options);
      const data = await res.json();
      setCocineros(data);
      console.log(data);

    } catch (err) {
      let statusText = error.statusText || "Ocurrio un error";
      setError({ error: true, mensaje: `Error: ${error.status} - ${statusText}`, bgc: "red" });
      console.log("Error para hacer el fetch. Tipo de error: ", err);
    }
    finally {
      setLoading(false);
    };
  }
  getLista();

}, [])


const altaCocinero = (nuevoCocinero) => {

  setLoading(true);

  const token = localStorage.getItem('token');
  const options = {
    method: "POST",
    headers: { "Content-type": "application/json;charset=utf-8", "Authorization" : "Bearer " + token},
    body: JSON.stringify(nuevoCocinero)
  }

  const alta = async () => {

    try {
      const res = await fetch(URL, options);
      const nuevoCocinero = await res.json();
      setCocineros([...cocineros, nuevoCocinero]);
      setError(ERRORINICIAL);

    } catch (error) {

      let statusText = error.statusText || "Ocurrio un error";
      setError({ error: true, mensaje: `Error: ${error.status} - ${statusText}`, bgc: "red" });

    }
    finally {
      setLoading(false);
    }


  }

  alta();
  
}


const modificarCocinero = (cocinero) => {

  window.confirm("Confirma Modificacion?");

  let id = cocinero.id;

  delete cocinero.id;

  setLoading(true);

  const token = localStorage.getItem('token');
  const options = {
    method: "PUT",
    headers: { "Content-type": "application/json;charset=utf-8", "Authorization" : "Bearer " + token},
    body: JSON.stringify(cocinero)
  }

  const modificacion = async () => {

    try {

      const res = await fetch(URL + "/" + id, options);
      const nuevoCocinero = await res.json();

      setCocineros(cocineros.map((cocinerito) => {
        if (cocinerito.id === id) {
          cocinerito = cocinero;
          cocinerito.id = id;
        }
        return cocinerito;
      }));

      setError(ERRORINICIAL);

    } catch (error) {

      let statusText = error.statusText || "Ocurrio un error";

      setError({ error: true, mensaje: `Error: ${error.status} - ${statusText}`, bgc: "red" });

    }
    finally {
      setLoading(false);
    }

  }

  modificacion();

}


const bajaCocinero = (id) => {
  const token = localStorage.getItem('token');
  if (!window.confirm("Confirma eliminacion?")) return;

  setLoading(true);

  const options = {
    method: "DELETE",
    headers: { "Content-type": "application/json;charset=utf-8", "Authorization" : "Bearer " + token},
  }


  const eliminar = async () => {

    try {
      const res = await fetch(URL + "/" + id, options);
      setCocineros(cocineros.filter(cocinerito => cocinerito.id !== id));
      setError(ERRORINICIAL);

    } catch (error) {

      let statusText = error.statusText || "Ocurrio un error";
      setError({ error: true, mensaje: `Error: ${error.status} - ${statusText}`, bgc: "red" });

    }
    finally {
      setLoading(false);
    }
  }

  eliminar();


}


return (


  <div className="container">
    <Logout />
    <Header title={"MasterChef"} />

    <Formulario
      altaCocinero={altaCocinero}
      modificarCocinero={modificarCocinero}
      editado={editado}
      setEditado={setEditado}
    />

    {error.error && <Mensaje color="white" bgColor={error.bgc}>{error.mensaje}</Mensaje>}

    {loading ? <Loader /> : <Tabla data={cocineros} bajaCocinero={bajaCocinero} setEditado={setEditado} />}


  </div>
);
 
}
 
export default Home;