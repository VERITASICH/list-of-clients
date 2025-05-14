import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
    const location = useLocation();

    return ( 
        <nav className='nav'>
            <Link
                to='/'
                className={
                    location.pathname === '/'
                        ? 'active'
                        : ''    
                }
            >
                Main
            </Link>
             <Link
                to='/addform'
                className={
                    location.pathname === '/addform'
                        ? 'active'
                        : ''    
                }
            >
                Add
            </Link>
        </nav>
     );
}
 
export default NavBar;