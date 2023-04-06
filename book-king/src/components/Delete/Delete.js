import deletestyle from './deletestyle.module.css';
import { Navigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useRef, useState, memo } from 'react';
import {bookServiceFactory} from '../../services/bookService';
import { useService } from '../../hooks/useService';
import { useBookContext } from '../../contexts/BookContext';
import { AuthContext } from '../../contexts/AuthContext';

export const Delete = () => {
    const {onDeleteBookSubmit, books} = useBookContext();
    const { bookId } = useParams(); 
    const [book, setBook] = useState({});
    const bookService = bookServiceFactory();
    const {userId} = useContext(AuthContext);
    const [uSure, setSure] = useState(false);

    
   useEffect(() => {
      let runEr = true;
       bookService.getOne(bookId)
            .then(result => { 
              
            if (runEr){ 
               setBook(result);
            }
            })
            .catch((e) => {
                setBook(e);
            });
         
           return () => {
            
            runEr = false;
           }    
}, [bookId]);  


    const onSubmit = (e) => {
        e.preventDefault();
        setSure(true);
    }
    /*onDeleteBookSubmit(bookId); */

    if (book.code == 404) {
        
        return <Navigate to={"/404"} />;
        
     }

  if (book._ownerId) {
     
    const booker = books.find(book => book._id === bookId);

    if (book._ownerId !== userId) {
        return <Navigate to={"/404"} />;
    }
    

    return (
        
        <div className={deletestyle.wrapper}>

         {uSure && (
            
            <div id="myModal" className={deletestyle.modal}>
            <div className={deletestyle.modalcontent}>
                <p className={deletestyle.modaltext}>Are you sure you want to delete this book?</p>
                <div className={deletestyle.modalbuttons}>
                    <button className={deletestyle.yes} onClick={(() => onDeleteBookSubmit(bookId))}>Yes</button>
                    <button className={deletestyle.no} onClick={(() => setSure(false))}>No</button>
                </div>
            </div>
        </div>
           )}
        
        <div className={deletestyle.formbox}>
            <h2>Delete a Book</h2>
            <form onSubmit={onSubmit}>
                <div className={deletestyle.inputbox}>
                    <p className={deletestyle.icon}><ion-icon name="bookmark"></ion-icon></p>
                    <input type="text" defaultValue={book.title} disabled/>
                    <label>Title</label>
                </div>
                <div className={deletestyle.inputbox}>
                    <p className={deletestyle.icon}><ion-icon name="layers"></ion-icon></p>
                    <input type="text" defaultValue={book.imageUrl} disabled/>
                    <label>ImageUrl</label>
                </div>             
                    <div className={deletestyle.inputbox}>
                        <p className={deletestyle.icon}><ion-icon name="egg"></ion-icon></p>
                        <input type="text" defaultValue={book.author} disabled/>
                        <label>Author</label>
                    </div>
                    <div className={deletestyle.inputbox}>
                    <p className={deletestyle.icon}><ion-icon name="cash"></ion-icon></p>
                        <input type="text" defaultValue={book.price} disabled/>
                        <label>Price</label>
                        
                    </div>
                    <div className={deletestyle.inputbox}>
                    <p className={deletestyle.icon}><ion-icon name="information-circle"></ion-icon></p>
                        <textarea id="viewarea" defaultValue={book.description} rows="5" cols="50" disabled/>
                        <span className={deletestyle.descri}>Description</span>
                    </div>
                    <button type="submit" className={deletestyle.btn}>Delete</button>                 
                </form>
        </div>
    </div>
    )
}

}
