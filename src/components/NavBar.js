import React, { useState } from "react";
import { NavLink, Link } from 'react-router-dom';
import logo from '../resources/images/logo.png';

function NavBar(props) {
    let [ isShown, setIsShown ] = useState(false);
    
    return (
        <header>
            <figure>
                <img src={logo} alt='' className='App-logo logo-spin'/>
                <figcaption className='thinkers-sign'><em>Thinkers</em></figcaption>
            </figure>
            <nav id='navbar'>
                <NavLink to='/' exact activeClassName='active-nav-link'>My Feed</NavLink>
                <NavLink to='/user' activeClassName='active-nav-link' 
                    onMouseEnter={() => { setIsShown(true) }}
                    onMouseLeave={() => { setIsShown(false) }}>
                    { props.user ? props.user.firstName : 'Log In' }
                    { isShown && <UserOptions>
                        <Link to='/' onClick={() => props.onLogOut()}>Logout</Link>
                    </UserOptions>}
                    </NavLink>
            </nav>
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