import { useState } from "react";
import { NavLink, Link } from 'react-router-dom';
import logo from '../resources/images/logo.png';

function NavBar() {
    let [ isShown, setIsShown ] = useState(false);
    
    return (
        <header>
            <figure>
                <img src={logo} alt='' className='App-logo'/>
                <figcaption id='thinkers-sign'><em>Thinkers</em></figcaption>
            </figure>
            <nav id='navbar'>
                <NavLink to='/' exact activeClassName='active-nav-link'>My Feed</NavLink>
                <NavLink to='/chat' activeClassName='active-nav-link'>Chat</NavLink>
                <NavLink to='/notifications' activeClassName='active-nav-link'>Notifications</NavLink>
                <NavLink to='/user' activeClassName='active-nav-link' 
                    onMouseEnter={() => { setIsShown(true) }}
                    onMouseLeave={() => { setIsShown(false) }}>
                    User
                    { isShown && <UserOptions />}
                    </NavLink>
            </nav>
        </header>
    );
}

function UserOptions() {
    return(
        <nav id='user-options'>
            <ul>
                <li><Link to='/profile'>My Profile</Link></li>
                <li><Link to='/settings'>Settings</Link></li>
                <li><Link to='/'>Logout</Link></li>
            </ul>
        </nav>
    )
}

export default NavBar;