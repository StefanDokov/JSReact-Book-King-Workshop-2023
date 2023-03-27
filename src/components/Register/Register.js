import registerstyle from './registerstyle.module.css';
import {Link} from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import {useForm} from '../../hooks/useForm';

export const Register = () => {

    const {onRegisterSubmit} = useContext(AuthContext);
    const {values, changeHandler, onSubmit} = useForm({
        username: '',
        email:'',
        password: '',
        rePass: '',
    },onRegisterSubmit);

    return (
        <div className={registerstyle.wrapper}>
        
        
        <div className={registerstyle.formbox}>
            <h2>Sign Up</h2>
            <form method='POST' onSubmit={onSubmit}>
                <div className={registerstyle.inputbox}>
                    <p className={registerstyle.icon}><ion-icon name="person"></ion-icon></p>
                    <input type="text" name="username" value={values.username} onChange={changeHandler} required/>
                    <label>Username</label>
                </div>
                <div className={registerstyle.inputbox}>
                    <p className={registerstyle.icon}><ion-icon name="mail"></ion-icon></p>
                    <input type="text" name="email" value={values.email} onChange={changeHandler} required/>
                    <label>Email</label>
                </div>             
                    <div className={registerstyle.inputbox}>
                        <p className={registerstyle.icon}><ion-icon name="lock-closed"></ion-icon></p>
                        <input type="password" name="password" value={values.password} onChange={changeHandler} required/>
                        <label>Password</label>
                    </div>
                    <div className={registerstyle.inputbox}>
                    <p className={registerstyle.icon}><ion-icon name="lock-open"></ion-icon></p>
                        <input type="password" name="rePass" value={values.rePass} onChange={changeHandler} required/>
                        <label>Repeat Password</label>
                    </div>
                    <div className={registerstyle.rememberForgot}>
                        <label><input type="checkbox"/>I agree to the terms &amp; conditions</label>
                    </div>
                    <button type="submit" className={registerstyle.btn}>Sign Up</button>
                    <div className={registerstyle.loginregister}>
                        <p>Already have an account? <Link to="/login"><span className={registerstyle.loginlink}>Login</span></Link></p>
                    </div>
                </form>
        </div>
    </div>
    )
}