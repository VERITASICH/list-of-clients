import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
    const location = useLocation();

    return ( 
        <nav className='nav'>
            <Link
                to='/list-of-clients/'
                className={
                    location.pathname === '/list-of-clients/'
                        ? 'active'
                        : ''    
                }
            >
                Главная
            </Link>
             <Link
                to='/addform'
                className={
                    location.pathname === '/addform'
                        ? 'active'
                        : ''    
                }
            >
                Добавить
            </Link>
        </nav>
     );
}
 
export default NavBar;