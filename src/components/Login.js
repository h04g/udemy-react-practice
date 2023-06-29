import { useState } from "react";
import { loginApi } from "../services/userServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [ loadingLogin, setLoadingLogin] = useState(false)

    useEffect(()=> {
        let token = localStorage.getItem("token");
        if(token){
            navigate("/")
        }
    },[])


    const handleLogin = async () => {
        if(!email || !password){
            toast.error("Email/Password is required")
            return;

        }
        setLoadingLogin(true)
        let res = await loginApi(email, password);
        if(res && res.token) {
            localStorage.setItem("token", res.token)
            navigate("/")
        }else {
            if(res && res.status ===400){
                toast.error(res.data.error)
            }
        }
        setLoadingLogin(false)

    }
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
                         />
                    
                </div>
                
                <button 
                    className={email && password ? "active": ""}
                    disabled={(email && password ) ? false : true}
                    onClick={()=>handleLogin()}>
                        {loadingLogin && <i className="fa-solid fa-sync fa-spin"></i>}
                        
                        &nbsp;Login</button>
                <div className="back">
                   <i className="fa-solid fa-angles-left"></i> Go back</div>

             </div>
        </>
    )
}

export default Login;