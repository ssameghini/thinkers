import React, { useEffect, useState } from "react";
import Register from './Register';
import Login from './Login';

export default function Auth({user, onLogIn}) {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        console.log(user);
        if (user !== false) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    }, [user]);
    
    return (
        <main className='authpage'>
            <h2>Welcome to <em className='thinkers-sign'>Thinkers</em> !</h2>
            <h3>A troubled and despaired social web 
                for sharing your thougths</h3>

            {loggedIn && 
            <div className='error-box'><span>You're already logged in, {user.firstName}</span></div>
            }

            <div className='auth-flex'>
                <Register />
                <Login onLogIn={onLogIn}/>
            </div>
        </main>
    )
}