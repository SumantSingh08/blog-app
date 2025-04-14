import React,{useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

function Protected({children, authentication = true}) {

    const navigate = useNavigate();
    const [loder, setLoder] = useState(true);
    const authStatus = useSelector(state => state.auth.status);
    useEffect(() =>{
        if(authentication && authStatus !== authentication){
            navigate('/login');

        } else if (!authentication && authStatus !== authentication){
            navigate('/');

        }
        setLoder(false);
    }, [authentication, authStatus, navigate]);
    return loder? <div>Loading...</div> : <>{children}</>;
}

export default Protected
