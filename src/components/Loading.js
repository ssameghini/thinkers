import React from 'react';
import logo from '../resources/images/logo.png';
import gear from '../resources/images/gear.png';

export default function Loading() {
    return(
        <div id='loading-page'>
            <figure>
                <img src={logo} alt='' className='loading-logo'/>
                <figcaption id='thinkers-sign'><em>Thinkers</em></figcaption>
            </figure>
            <img src={gear} alt='loading icon' className='loading-icon'/>
        </div>
    )
}