import React,{useEffect} from 'react';
import GoogleButton from 'react-google-button'
import {useHistory} from 'react-router-dom';
import './main.css';

function Main(props) {
    let history = useHistory();

    const openLoginComponent = async() =>{
        const googleLoginURL = `${process.env.REACT_APP_API_BASE_URL}/auth/google`
        window.location.replace(googleLoginURL);
    }

    const query = new URLSearchParams(window.location.search);
    const token = query.get('token')

    useEffect(() => {
        if(token){
            localStorage.setItem('token', token);
            localStorage.setItem('isLoggedIn', true);
            history.push('/home');
        }
    }, [])

    return (
        <div className="main-page-body">
            <div className="google-btn-container">
                <GoogleButton
                    onClick={() => openLoginComponent()}
                />
            </div>
        </div>
    )
}

export default Main;
