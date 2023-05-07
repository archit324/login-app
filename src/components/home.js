import { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";


const Home = () =>{
    const navigate = useNavigate();
    const [status,setStatus] = useState();
    useEffect(()=>{
        const authStatus = sessionStorage.getItem('isAuthenticated')
        setStatus(authStatus);
    },[])
    useEffect(() => {
        return () => {
          window.onbeforeunload= function(){
            sessionStorage.clear()
          }
        };
    }, []);

    const logout = () =>{
        setStatus(false)
        sessionStorage.clear()
    }

    if(!status){
        navigate('/login')
    }
    else{
        return (
            <>
            <h2>
                Welcome! you have logged in Now.
            </h2>
            <button onClick={logout}>Click to Logout</button>
            </>
        )
    }

}

export default Home;