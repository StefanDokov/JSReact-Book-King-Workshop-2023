import { createContext} from 'react';
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

    const onLoginSubmit = async(data) => {
        try{
        const result = await authService.login(data);
        
        setAuth(result);
    
        navigate('/catalog');
    
        } catch(err) {
          throw err.message;
        }
    
      };

    const onRegisterSubmit = async(data) => {
        const {rePass, ...registerData} = data;
     
        if (rePass !== registerData.password) {
         return console.log(`Passwords don't match!`);
        }
     
         try{
           const result = await authService.register(registerData);
     
           setAuth(result);
     
           navigate('/catalog');
         } catch(err) {
           throw err.message;
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
      };

    return (
        <>
        <AuthContext.Provider value={contextEr}>
            {children}
        </AuthContext.Provider>
        </>
    )
}