import React from 'react';
import Row from './Row';
import { TableContainer, Table, TableCell, TableHead, TableRow , makeStyles, Paper, TableBody } from "@material-ui/core"

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
const Tabla = ( {data, bajaCocinero, setEditado} ) => {
    return (

        // <div className="contenedor-tabla">

        //     <table>
        //         <thead>
        //             <tr>

        //                 <th>Nombre</th>
        //                 <th>Edad</th>
        //                 <th>Especialidad</th>
        //                 <th>Favorito</th>
        //                 <th>Capitulos</th>
        //                 <th>Acciones</th>

        //             </tr>
        //         </thead>


        //         <tbody>

                    // {

                    //     !data.length ? <tr><td colSpan="3">  Sin resultados </td></tr> : 

                    //     data.map(el => 
                    //     <Row key={el.id} cocinero={el} 
                    //     handlerUpdate = {setEditado} 
                    //     handlerDelete = {bajaCocinero}/>)
                    // }
                    
        //         </tbody>

        //     </table>


        // </div>
        <TableContainer component={Paper} >
            <Table className={useStyles.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Nombre</TableCell>
                        <TableCell align="center">Edad</TableCell>
                        <TableCell align="center">Especialidad</TableCell>
                        <TableCell align="center">Favorito</TableCell>
                        <TableCell align="center">Capitulos</TableCell>
                        <TableCell align="center">Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {

                    !data.length ? <tr><td colSpan="3">  Sin resultados </td></tr> : 

                    data.map(el => 
                    <Row key={el.id} cocinero={el} 
                    handlerUpdate = {setEditado} 
                    handlerDelete = {bajaCocinero}/>)
                    }
                </TableBody>
            </Table>
        </TableContainer> 


    );
}

export default Tabla;