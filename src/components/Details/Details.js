import detailstyle from './detailstyle.module.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { bookServiceFactory } from '../../services/bookService';
import { useService } from '../../hooks/useService';
import { AuthContext } from '../../contexts/AuthContext';
import { commentFactory } from '../../services/commentService';
import { useForm } from '../../hooks/useForm';


export const Details = () => {
    const { bookId } = useParams();
    const [book, setBook] = useState({});
    const bookService = useService(bookServiceFactory);
    const commentService = useService(commentFactory);
    const { userId, isAuthenticated, username } = useContext(AuthContext);

    const onCommentSubmit = async (data) => {

        const response = await commentService.create(bookId, data.comment, username);
 
        setBook(state => ({
            ...state,
            comments: [...state.comments, response],
    }));     
    };
     
    const { values, changeHandler, onSubmit } = useForm({
        comment: '',
    }, onCommentSubmit);

    useEffect(() => {
        Promise.all([
            bookService.getOne(bookId),
            commentService.getAll(bookId),
        ])
         .then(([bookData, comments]) => {
            setBook({...bookData,
                comments
            });
        });
    }, [bookId]);


    const isOwner = book._ownerId === userId;

    return (

        <div className={detailstyle.containera}>
            <div className={detailstyle.productdiv}>
                <div className={detailstyle.productdivleft}>
                    <div className={detailstyle.imgcontainer}>
                        <img src={book.imageUrl} alt="watch" />
                    </div>

                </div>
                <div className={detailstyle.productdivright}>
                    <span className={detailstyle.productname}>Title: {book.title}</span>
                    <span className={detailstyle.productprice}>Price: $ {book.price}</span>
                    <span className={detailstyle.productauthor}>Author: {book.author}</span>

                    <p className={detailstyle.productdescription}><span className={detailstyle.desc}>Description:</span> {book.description}</p>
                    {isOwner && (
                        <div className={detailstyle.btngroups}>
                            <Link to={`/edit/${book._id}`}><button type="button" className={detailstyle.addcartbtn}>edit</button></Link>
                            <Link to={`/delete/${book._id}`}><button type="button" className={detailstyle.buynowbtn}>delete</button></Link>
                        </div>
                    )}
                </div>
            </div>
            {isAuthenticated && (
                <div className={detailstyle.chatContainer}>
                    <h2>Chat Messages</h2>
                    {book.comments && book.comments.map(x => (
                        <div key={x._id} className={detailstyle.container}>
                            <img src="../images/Default.png" alt="Avatar" />
                            <span>{x.username} says:</span>
                            <p><br />{x.comment}</p>
                        </div>
                    ))}

            {!book.comments?.length && (
                
                <p><br/>No Comments...</p>
                
            )}
                    <div className={detailstyle.commentbox}>
                        <div className={detailstyle.usera}>
                            <div className={detailstyle.imaga}>
                                <img src='../images/Default.png' alt='image' />
                            </div>
                            <div className={detailstyle.namo}>{username}</div>
                        </div>
                        <form method='POST' onSubmit={onSubmit}>
                            <textarea name='comment' value={values.comment} onChange={changeHandler} cols="30" rows="10" placeholder='Your Massage'></textarea>
                            <button className={detailstyle.commentsubmit}>Comment</button>
                        </form>
                    </div>
                </div>
            )}

        </div>

    )

}