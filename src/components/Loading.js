import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import logo from '../resources/images/logo.png';
import gear from '../resources/images/gear.png';

export default function Loading(props) {
    const [redirect, setRedirect ] = useState('');
    
    useEffect(() =>  {
        axios.get('http://localhost:5000/', { withCredentials: true })
            .then(res => {
                let user = res.data;
                if (res.data !== null) {
                    console.log(user);
                    props.onAuth(user);
                    setTimeout(() => {
                        setRedirect('/feed');
                    }, 1200);
                } else {
                    console.log(user);
                    props.onAuth(user);
                    setTimeout(() => {
                        setRedirect('/auth');
                    }, 1200);
                }
            })
            .catch(e => {
                console.log(e);
                setRedirect('/auth');
            })
    })

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