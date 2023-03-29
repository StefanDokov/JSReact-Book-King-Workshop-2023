import catalogstyle from './catalogstyle.module.css';
import { Nobooks } from '../Nobooks/Nobooks';
import { CatalogItem } from './CatalogItems/CatalogItem';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';
import {Booksno} from '../Booksno/Booksno'; 
import { useBookContext } from '../../contexts/BookContext';

export const Catalog = () => {
       
    const {books} = useBookContext();    
    const {isAuthenticated} = useContext(AuthContext);
     
    if (!books?.length && !isAuthenticated) {
        return <Nobooks />;
     } else if (!books?.length && isAuthenticated){
        return <Booksno />
     }

    return (
        <div>
            <h1 className={catalogstyle.intro}>Book Catalog</h1>
        <div className={catalogstyle.gallery}>
            
            {books.map(x => (<CatalogItem key={x._id} {...x}/>))}
        
    </div>
    </div>
    )
     
}