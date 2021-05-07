import React, { useEffect, useState } from "react";
import Register from './Register';
import Login from './Login';

export default function Auth(props) {
    const user = props.user;
    const [loggedOut, setLoggedOut] = useState(false);

    useEffect(() => {
        console.log(user);
        if (user !== null) {
            setLoggedOut(true);
        } else if (user === null) {
            setLoggedOut(false);
        }
    }, [user]);
    
    return (
        <main className='authpage'>
            <h2>Welcome to <em className='thinkers-sign'>Thinkers</em> !</h2>
            <h3>A troubled and despaired social web 
                for sharing your thougths</h3>

            {loggedOut && 
            <div className='error-box'><span>You've been logged out.</span></div>
            }

            <div className='auth-flex'>
                <Register />
                <Login onLogIn={props.onLogIn}/>
            </div>
        </main>
    )
}