import { createContext, useState} from 'react';
import {authServiceFactory} from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';


export const AuthContext = createContext();

export const AuthProvider = ({
    children,
}) => {
    const [auth, setAuth] = useLocalStorage('auth', {});
    const authService = authServiceFactory(auth.accessToken);
    const navigate = useNavigate();
    const [err, setErr] = useState();

    const onLoginSubmit = async(data) => {
        try{
        const result = await authService.login(data);
        
        setAuth(result);
    
        navigate('/catalog');
    
        } catch(err) {
          setErr(err.message);
          setTimeout(() => setErr(), 2000);
        }
    
      };

    const onRegisterSubmit = async(data) => {
        const {rePass, ...registerData} = data;
     
        if (rePass !== registerData.password) {
         setErr(`Passwords don't match!`);
         setTimeout(() => setErr(), 2000);
          return;
        }
     
         try{
           const result = await authService.register(registerData);
     
           setAuth(result);
     
           navigate('/catalog');
         } catch(err) {
          setErr(err.message);
            setTimeout(() => setErr(), 2000);
         }
     
       };


    const onLogout = async() => {
        
        await authService.logout();
        
        setAuth({});
        
        navigate('/');
    
      };
      

    const contextEr = {
        onLoginSubmit,
        onRegisterSubmit,
        onLogout,
        username: auth.username,
        userId: auth._id,
        token: auth.accessToken,
        userEmail: auth.email,
        isAuthenticated: !!auth.accessToken,
        err,
        
      };

    return (
        <>
        <AuthContext.Provider value={contextEr}>
            {children}
        </AuthContext.Provider>
        </>
    )
}