import {useNavigate} from "react-router-dom";
import { useEffect } from "react";

const HeaderComponent = () =>{
    const navigate = useNavigate();
    useEffect(()=>{
        navigate('/login')
    },[])

    return (
        <>
            <h1>Welcome!</h1>
        </>
 
    )
}

export default HeaderComponent;