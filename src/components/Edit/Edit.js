import editstyle from './editstyle.module.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {bookServiceFactory} from '../../services/bookService';
import { useService } from '../../hooks/useService';

export const Edit = ({
    onEditBookSubmit
}) => {
    const { bookId } = useParams();
    const bookService = useService(bookServiceFactory);
    const [newBook, setNewBook] = useState({
        title: '',
        imageUrl: '',
        author: '',
        price: '',
        description: ''
     });

    useEffect(() => {
        bookService.getOne(bookId)
            .then(result => {
               setNewBook(result);
            });
    },[bookId]);


    const onChangeHandler = (e) => {
        setNewBook(state => ({...state, [e.target.name]: e.target.value}));
     };

     const onSubmit = (e) => {
        e.preventDefault();
        onEditBookSubmit(newBook, bookId); 
     }

    return (
        <div className={editstyle.wrapper}>
        <p className={editstyle.iconclose}>
            <ion-icon name="close"></ion-icon>
        </p>
        
        <div className={editstyle.formbox}>
            <h2>Edit a Book</h2>
            <form onSubmit={onSubmit}>
                <div className={editstyle.inputbox}>
                    <p className={editstyle.icon}><ion-icon name="bookmark"></ion-icon></p>
                    <input type="text" name="title" value={newBook.title} onChange={onChangeHandler} required/>
                    <label>Title</label>
                </div>
                <div className={editstyle.inputbox}>
                    <p className={editstyle.icon}><ion-icon name="layers"></ion-icon></p>
                    <input type="text" name="imageUrl" value={newBook.imageUrl} onChange={onChangeHandler} required/>
                    <label>ImageUrl</label>
                </div>             
                    <div className={editstyle.inputbox}>
                        <p className={editstyle.icon}><ion-icon name="egg"></ion-icon></p>
                        <input type="text" name="author" value={newBook.author} onChange={onChangeHandler} required/>
                        <label>Author</label>
                    </div>
                    <div className={editstyle.inputbox}>
                    <p className={editstyle.icon}><ion-icon name="cash"></ion-icon></p>
                        <input type="text" name="price" value={newBook.price} onChange={onChangeHandler} required/>
                        <label>Price</label>
                        
                    </div>
                    <div className={editstyle.inputbox}>
                    <p className={editstyle.icon}><ion-icon name="information-circle"></ion-icon></p>
                        <textarea id="viewarea" rows="5" cols="50" name="description" value={newBook.description} onChange={onChangeHandler} required/>
                        <span className={editstyle.descri}>Description</span>
                    </div>
                    <button type="submit" className={editstyle.btn}>Edit</button>      
                </form>
        </div>
    </div>
    )
}