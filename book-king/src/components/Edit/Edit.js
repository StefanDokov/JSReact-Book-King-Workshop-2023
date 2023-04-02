import editstyle from './editstyle.module.css';
import { Navigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useRef, useState } from 'react';
import {bookServiceFactory} from '../../services/bookService';
import { useService } from '../../hooks/useService';
import { useBookContext } from '../../contexts/BookContext';
import { AuthContext } from '../../contexts/AuthContext';


export const Edit = () => {
    const {onEditBookSubmit, books} = useBookContext();
    const { bookId } = useParams();
    const bookService = bookServiceFactory();
    const {userId} = useContext(AuthContext);
    const [newBook, setNewBook] = useState({
        title: '',
        imageUrl: '',
        author: '',
        price: '',
        description: ''
     });
    
    useEffect(() => {
        let connecti = true;
        
        bookService.getOne(bookId)
            .then(result => {
              if(connecti) {
              setNewBook(result);
              }
            
    })
    .catch((e) => {
        setNewBook(e);
    });
    return () => {
        
        connecti = false;
       } 

    }, [bookId]);

   
    const onChangeHandler = (e) => {
        setNewBook(state => ({...state, [e.target.name]: e.target.value}));
     };

     const onSubmit = (e) => {
        e.preventDefault();
        onEditBookSubmit(newBook, bookId); 
     }

     if (newBook.code == 404) {
        
        return <Navigate to={"/404"} />;
        
     }
     
    if (newBook._ownerId){
        
    
    const booker = books.find(book => book._id === bookId);
    
    
    if (newBook._ownerId !== userId) {
        return <Navigate to={"/404"} />;
    }


    return (
        
        
        <div className={editstyle.wrapper}>
        
        
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
}