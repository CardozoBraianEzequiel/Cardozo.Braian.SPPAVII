import React from 'react';
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core"

const Logout = () => {

    const history = useHistory();

    const handlerSubmit = (e) => {
        alert('Sesión finalizada.')
        localStorage.removeItem('token');
        history.push('/login');
    }

    return (<>
            <Button onClick={handlerSubmit}>Finalizar Sesión</Button>
        </>);
}

export default Logout;