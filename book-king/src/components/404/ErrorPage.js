import errorstyle from './errorstyle.module.css';
import {Link} from 'react-router-dom';

export const ErrorPage = () => {
    return (
        <div className={errorstyle.content}>
        <h1>404</h1>
        <p>This page is out of reach!<br/>Click on the button below to go to home section.</p>
        <div>
         <Link to="/"><button type="button" className={errorstyle.homeBtn}><span className={errorstyle.btnEdt}></span> Home</button></Link>
         </div>
     </div>
    )
}