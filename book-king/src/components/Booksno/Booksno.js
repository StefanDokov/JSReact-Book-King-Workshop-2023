import booksnostyle from './booksnostyle.module.css';
import { Link } from 'react-router-dom';

export const Booksno = () => {
    return (
        <div className={booksnostyle.content}>
        <h2>No Books Yet</h2>
        <p>You can be the first creator.<br/>Click on the button bellow to create a book.</p>
        <div>
         <Link to="/create"><button type="button" className={booksnostyle.homeBtn}><span className={booksnostyle.btnEdt}></span> Add a Book</button></Link>
        </div>
     </div>
    )
}