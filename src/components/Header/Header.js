import { AuthContext } from '../../contexts/authContext';
import headstyle from './headstyle.module.css'
import {Link} from 'react-router-dom';
import { useContext } from 'react';

export const Header = () => {
    const {username, isAuthenticated} = useContext(AuthContext);

    return (
        <nav className={headstyle.navbar}>
            <Link to="/">
            <img src="../images/logo.png" alt="logo" className={headstyle.logo}/>
            </Link>
            {isAuthenticated && (<span className={headstyle.userN}>{username}</span>)}
            
            <ul>
                <li><Link to="/catalog">All Books</Link></li>
                <li><Link to="/about">About</Link></li> 

                {!isAuthenticated && (
                <>
                <li><Link to="/login">Sign In</Link></li>
                <li><Link to="/register">Sign Up</Link></li>
                </>)} 
                {isAuthenticated && (<>
                    <li><Link to="/profile">My Books</Link></li>
                <li><Link to="/create">Add a Book</Link></li>
                <li><Link to="/logout">Logout</Link></li>
                </>)}
                
            </ul>
        </nav>
    );
}