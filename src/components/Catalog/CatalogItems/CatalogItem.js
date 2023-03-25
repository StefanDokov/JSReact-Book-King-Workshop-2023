import {Link} from 'react-router-dom';
import catalogstyle from '../catalogstyle.module.css';

export const CatalogItem = ({
    title,
    imageUrl,
    author,
    price,
    _id
}) => {
    return (
        <div className={catalogstyle.content}>
            <img className={catalogstyle.cover} src={imageUrl} alt="tangra.jpg"/>
            <h3>{title}</h3>
            <p className={catalogstyle.descripto}>{author}</p>
            <h6>${price}</h6>
            <Link to={`/details/${_id}`}>
            <button className={catalogstyle.details}>See Details</button>
            </Link>
        </div>
    )
}