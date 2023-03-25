import loginstyle from './login.module.css';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/authContext';
import { useForm } from '../../hooks/useForm';

export const Login = () => {
    const { onLoginSubmit } = useContext(AuthContext);
    const { values, changeHandler, onSubmit } = useForm({
        email: '',
        password: '',
    }, onLoginSubmit);

    return (
        <div className={loginstyle.wrapper}>
            <p className={loginstyle.iconClose}>
                <ion-icon name="close"></ion-icon>
            </p>
            <div className={loginstyle.formbox}>
                <h2>Sign In</h2>
                <form method='POST' onSubmit={onSubmit}>
                    <div className={loginstyle.inputbox}>
                        <p className={loginstyle.icon}><ion-icon name="mail"></ion-icon></p>
                        <input type="text" name="email" value={values.email} onChange={changeHandler} required />
                        <label>Email</label>
                    </div>
                    <div className={loginstyle.inputbox}>
                        <p className={loginstyle.icon}><ion-icon name="lock-closed"></ion-icon></p>
                        <input type="password" name="password" value={values.password} onChange={changeHandler} required />
                        <label>Password</label>
                    </div>
                    <div className={loginstyle.rememberForgot}>
                        <label><input type="checkbox" />Remember me</label>
                    </div>
                    <button type="submit" className={loginstyle.btn}>Sign In</button>
                    <div className={loginstyle.loginregister}>
                        <p>Don't have an account? <Link to="/register"><span className={loginstyle.registerlink}>Register</span></Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}