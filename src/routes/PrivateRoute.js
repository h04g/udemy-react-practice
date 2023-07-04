import {Routes, Route, Link } from "react-router-dom";

import { Alert } from "react-bootstrap";
import { useSelector} from 'react-redux'


const PrivateRoute = (props) => {

    const user = useSelector( state => state.user.account)
    if(user && !user.auth) {
        return <>
        
        <Alert variant="danger" className="mt-3" >
            <Alert.Heading> 
                Oh no! You got an Error
            </Alert.Heading> 
                <p>Ban khong co quyen truy cap vao day</p>
            
        </Alert>
        </>
    }

    return (
        <>
            {props.children}
        </>
    )

}

export default PrivateRoute;