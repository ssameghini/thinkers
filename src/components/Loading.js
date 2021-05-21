import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import logo from '../resources/images/logo.png';
import gear from '../resources/images/gear.png';

export default function Loading({userLogged}) {
    const [redirect, setRedirect ] = useState('');
    
    useEffect(() =>  {
        console.log('Loading user:', userLogged);
        if (!userLogged) {
            setRedirect('/auth');
        } else if (userLogged) {
            setRedirect('/feed');
        } else {
            console.log('Loading issue, user: ', userLogged);
        }
    }, [userLogged]);

    return(
        <div id='loading-page'>
            <figure>
                <img src={logo} alt='' className='loading-logo'/>
                <figcaption id='thinkers-sign'><em>Thinkers</em></figcaption>
            </figure>
            <img src={gear} alt='loading icon' className='loading-icon'/>
            {redirect === '/feed' && 
            <Redirect to='/feed'/>}
            {redirect === '/auth' &&
            <Redirect to='/auth'/>}
        </div>
    )
}