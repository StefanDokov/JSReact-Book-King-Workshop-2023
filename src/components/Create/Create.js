import createstyle from './createstyle.module.css';
import { useForm } from '../../hooks/useForm';

export const Create = ({
    onCreateBookSubmit,
}) => {
     const {values, changeHandler, onSubmit} = useForm({
        title: '',
        imageUrl: '',
        author: '',
        price: '',
        description: ''
     }, onCreateBookSubmit);


    return (
        <div className={createstyle.wrapper}>
        <p className={createstyle.iconclose}>
            <ion-icon name="close"></ion-icon>
        </p>
        
        <div className={createstyle.formbox}>
            <h2>Add a Book</h2>
            <form method='POST' onSubmit={onSubmit}>
                <div className={createstyle.inputbox}>
                    <p className={createstyle.icon}><ion-icon name="bookmark"></ion-icon></p>
                    <input value={values.title} onChange={changeHandler} name="title" type="text" required/>
                    <label>Title</label>
                </div>
                <div className={createstyle.inputbox}>
                    <p className={createstyle.icon}><ion-icon name="layers"></ion-icon></p>
                    <input value={values.imageUrl} onChange={changeHandler} name="imageUrl" type="text" required/>
                    <label>ImageUrl</label>
                </div>             
                    <div className={createstyle.inputbox}>
                        <p className={createstyle.icon}><ion-icon name="egg"></ion-icon></p>
                        <input value={values.author} onChange={changeHandler} name="author" type="text" required/>
                        <label>Author</label>
                    </div>
                    <div className={createstyle.inputbox}>
                    <p className={createstyle.icon}><ion-icon name="cash"></ion-icon></p>
                        <input value={values.price} onChange={changeHandler} name="price" type="number" min="1" required/>
                        <label>Price</label>
                    </div>
                    <div className={createstyle.inputbox}>
                    <p className={createstyle.icon}><ion-icon name="information-circle"></ion-icon></p>
                        <textarea value={values.description} onChange={changeHandler} name="description" id="viewarea" rows="5" cols="50" required/>
                        <label htmlFor="viewarea">Description</label>
                    </div>
                    <button type="submit" className={createstyle.btn}>Add a Book</button>
                    
                </form>
        </div>
    </div>
    )
}