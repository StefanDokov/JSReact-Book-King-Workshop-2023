
import profilestyle from './profilestyle.module.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { bookServiceFactory } from '../../services/bookService';
import { useService } from '../../hooks/useService';
import { useNavigate } from 'react-router-dom';

export const Profile = () => {
    const {username, userEmail, userId, token} = useContext(AuthContext);
    const bookService = bookServiceFactory();
    const [mybooks, setMybooks] = useState([]);
    const navigate = useNavigate();
 
    useEffect(() => {
        bookService.getAllmyBooks(userId)
        .then(res => {
            setMybooks(res);
        });
    }, []);


    return (
        <div>
            <h1 className={profilestyle.intro}>Profile</h1>
        <div className={profilestyle.pagewrap}>
            <div className={profilestyle.profilestuff}>
                <div className={profilestyle.profiletop}>
                    <div className={profilestyle.profilepicturewrap}>
                        <div className={profilestyle.profilepicture}>
                            <img src="../images/Default.png" alt="userche" />
                        </div>
                    </div>
                    <div className={profilestyle.profiletopright}>
                        <div className={profilestyle.username}>
                            <p>{username}</p>
                        </div>
                    </div>
                </div>
                <div className={profilestyle.coverwrap}>
                    <div className={profilestyle.factwrap}>
                        <div className={profilestyle.userfact}>
                            <p>{userEmail}</p>
                            <p><br/>{mybooks?.length} Books</p>
                        </div>
                    </div>
                </div>
            </div>
            {mybooks?.length && (
            <div className={profilestyle.bookContainer}>
                {mybooks?.map(x => (
                <div key={x._id} className={profilestyle.galler} onClick={() => navigate(`/details/${x._id}`)}>
                        <img src={x.imageUrl} alt="watch" width="600" height="400" />
                    <div className={profilestyle.desc}>{x.title}</div>
                </div>  ))}
                      
            </div>
            )}
        </div>
        </div>
    )
}