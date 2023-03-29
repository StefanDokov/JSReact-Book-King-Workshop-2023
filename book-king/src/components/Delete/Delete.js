import deletestyle from './deletestyle.module.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {bookServiceFactory} from '../../services/bookService';
import { useService } from '../../hooks/useService';
import { useBookContext } from '../../contexts/BookContext';

export const Delete = () => {
    const {onDeleteBookSubmit} = useBookContext();
    const { bookId } = useParams();
    const [book, setBook] = useState({});
    const bookService = useService(bookServiceFactory);
    useEffect(() => {
        bookService.getOne(bookId)
            .then(result => {
               setBook(result);
            });
    },[bookId]);

    const onSubmit = (e) => {
        e.preventDefault();
        onDeleteBookSubmit(bookId);
    }


    return (
        <div className={deletestyle.wrapper}>
        
        
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