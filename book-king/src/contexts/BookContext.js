import { useState, useEffect, useContext } from 'react';
import { createContext } from "react";
import {bookServiceFactory} from '../services/bookService';
import { useNavigate } from 'react-router-dom';
import { useService } from '../hooks/useService';

export const BookContext = createContext();

export const BookProvider = ({
    children
}) => {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const bookService = bookServiceFactory();

    useEffect(() => {
        bookService.getAll()
          .then(res => {
            setBooks(res)
          })
      }, []);

    const onCreateBookSubmit = async (data) => {
        const newBook = await bookService.create(data);

        setBooks(state => [...state, newBook]);

        navigate('/catalog');
    };

    const onEditBookSubmit = async (data, id) => {
        await bookService.edit(data, id);

        const bookz = await bookService.getAll();

        setBooks(bookz);

        navigate(`/details/${id}`);
    };

    const onDeleteBookSubmit = async (bookId) => {
        await bookService.remove(bookId);

        setBooks(state => {
            return state.filter(x => x._id !== bookId);
        });

        navigate('/catalog');
    };

    const getBook = (gameId) => {
          return books.find(game => game._id == gameId);
    }
    
    const bookContextEr = {
        books,
        onCreateBookSubmit,
        onEditBookSubmit,
        onDeleteBookSubmit,
        getBook
        
    }

    return (
        <BookContext.Provider value={bookContextEr}>
            {children}
        </BookContext.Provider>
    );
}

export const useBookContext = () => {
    const context = useContext(BookContext);

    return context;
}