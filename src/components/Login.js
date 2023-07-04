import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { handleLoginRedux } from "../redux/actions/userAction";
import { useDispatch, useSelector} from "react-redux"
const Login = () => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const isLoading = useSelector(state => state.user.isLoading )
    const account = useSelector(state => state.user.account )

    const handleLogin = async () => {
        if(!email || !password){
            toast.error("Email/Password is required")
            return;

        }
        dispatch(handleLoginRedux(email, password));
    }

    const handleGoBack = () => {
        navigate("/")

    }
    const handlePressEnter = async (event) => {
        if(event && event.key === 'Enter'){
           await handleLogin() ;
        }
         
    }

    useEffect (()=> {
        if (account && account.auth === true){
            navigate("/")
        }
    }, [account])
    return (
        <>
             <div className="login-container col-12 col-sm-4 ">
                <div className="title">
                    Log in
                </div>
                <div className="text">Email or Username (eve.holt@reqres.in)</div>
                <input 
                    type="text" 
                    placeholder="Email or Username..."
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    />
                <div className="input-2">
                    <input 
                    type="password" 
                        placeholder="Password...."
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        onKeyDown={(event)=>handlePressEnter(event)}

                         />
                    
                </div>
                
                <button 
                    className={email && password ? "active": ""}
                    disabled={(email && password ) ? false : true}
                    onClick={()=>handleLogin()}>
                        {isLoading && <i className="fa-solid fa-sync fa-spin"></i>}
                        
                        &nbsp;Login</button>
                <div className="back">
                   <i className="fa-solid fa-angles-left"></i> 
                   <span onClick={()=> handleGoBack()}>&nbsp; Go back</span>
                </div>

             </div>
        </>
    )
}

export default Login;