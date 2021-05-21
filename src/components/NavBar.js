import React, { useState } from "react";
import { NavLink, Link } from 'react-router-dom';
import logo from '../resources/images/logo.png';

function NavBar({user, onLogOut}) {
    let [ isShown, setIsShown ] = useState(false);
    
    return (
        <header>
            <figure id='thinkers-brand'>
                <img src={logo} alt='' className='App-logo logo-spin'/>
                <figcaption><em className='thinkers-sign'>Thinkers</em></figcaption>
            </figure>
            { user && 
            <nav id='navbar'>
                <NavLink to='/feed' exact activeClassName='active-nav-link'>My Feed</NavLink>
                <NavLink to='/user' activeClassName='active-nav-link' 
                    onMouseEnter={() => { setIsShown(true) }}
                    onMouseLeave={() => { setIsShown(false) }}>
                    { user.firstName }
                    { isShown && <UserOptions>
                        <Link to='/' onClick={() => onLogOut()}>Logout</Link>
                    </UserOptions>}
                    </NavLink>
            </nav> }
        </header>
    );
}

function UserOptions(props) {
    return(
        <nav id='user-options'>
            <ul>
                <li><Link to='/profile'>My Profile</Link></li>
                <li><Link to='/settings'>Settings</Link></li>
                <li>{props.children}</li>
            </ul>
        </nav>
    )
}

export default NavBar;