import nobookstyle from './nobookstyle.module.css';
import { Link } from 'react-router-dom';

export const Nobooks = () => {
    return (
        <div className={nobookstyle.content}>
        <h2>No Books Yet</h2>
        <p>You can be the first creator.<br/>Click on the buttons below to login to your account or to create one.</p>
        <div>
         <Link to="/login"><button type="button" className={nobookstyle.homeBtn}><span className={nobookstyle.btnEdt}></span> Sign In</button></Link>
         <Link to="/register"><button type="button" className={nobookstyle.homeBtn}><span className={nobookstyle.btnEdt}></span> Sign Up</button></Link>
        </div>
     </div>
    )
}