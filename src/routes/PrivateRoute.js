import {Routes, Route, Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Alert } from "react-bootstrap";


const PrivateRoute = (props) => {


    const { user} = useContext(UserContext)


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