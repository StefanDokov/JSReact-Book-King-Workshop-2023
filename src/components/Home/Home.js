import homestyle from './homestyle.module.css';
import {Link} from 'react-router-dom';

export const Home = () => {
    return (
        <div className={homestyle.content}>
        <h1>Book King</h1>
        <p>The only place where you can find every book you are looking for.<br/>Click on the buttons below to see our catalog or to read more about our page.</p>
        <div>
         <Link to="/catalog"><button type="button" className={homestyle.homeBtn}><span className={homestyle.btnEdt}></span> All Books</button></Link>
         <Link to="/about"><button type="button" className={homestyle.homeBtn}><span className={homestyle.btnEdt}></span> About</button></Link>
        </div>
     </div>
    )
}