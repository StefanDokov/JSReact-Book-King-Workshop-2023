import { useContext } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useBookContext } from "../../contexts/BookContext"



export const BookOwner = () => {
    const {getBook} = useBookContext();
    const {bookId} = useParams();
    const {userId} = useContext(AuthContext);

    const currentGame = getBook(bookId);

    if (currentGame._ownerId !== userId) {
        return <Navigate to={"/404"} />;
    }

    return <Outlet />;
}