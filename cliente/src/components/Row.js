import React from 'react';
import { TableCell, TableRow , Button } from "@material-ui/core"

const Row = ({ cocinero, handlerDelete, handlerUpdate }) => {

    const { id, nombre, edad, especialidad, favorito, cantidadDeCapitulos} = cocinero;

    return (


        <TableRow>

            <TableCell>{nombre}</TableCell>
            <TableCell>{edad}</TableCell>
            <TableCell>{especialidad}</TableCell>
            <TableCell>{favorito ? "Si" : "No"}</TableCell>
            <TableCell>{cantidadDeCapitulos}</TableCell>
            <TableCell align="center" >
                <Button color="primary" onClick={() => handlerUpdate(cocinero)}> Editar </Button>
                <Button color="secondary" onClick={() => handlerDelete(id)}> Eliminar </Button>
            </TableCell>

        </TableRow>
    );
}


export default Row;