import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AuthContext } from './contexts/authContext';
import {authServiceFactory} from './services/authService';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Home } from './components/Home/Home';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { About } from './components/About/About';
import { Catalog } from './components/Catalog/Catalog';
import { Create } from './components/Create/Create';
import { Details } from './components/Details/Details';
import { Profile } from './components/Profile/Profile';
import { Edit } from './components/Edit/Edit';
import { Delete } from './components/Delete/Delete';
import { Logout } from './components/Logout/Logout';
import {bookServiceFactory} from './services/bookService';


function App() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [auth, setAuth] = useState({});
  const bookService = bookServiceFactory(auth.accessToken);
  const authService = authServiceFactory(auth.accessToken);

  useEffect(() => {
    bookService.getAll()
      .then(res => {
        setBooks(res)
      })
  }, []);

  const onCreateBookSubmit = async (data) => {
    const newBook = await bookService.create(data);

    setBooks(state => [...state, newBook]);

    navigate('/catalog');
  };

  const onEditBookSubmit = async (data, id) => {
    await bookService.edit(data, id);
    
    const bookz = await bookService.getAll();

    setBooks(bookz);

    navigate(`/details/${id}`);
  };
   
  const onDeleteBookSubmit = async(bookId) => {
      await bookService.remove(bookId);

      setBooks(state => {
          return state.filter(x => x._id !== bookId);
      });

      navigate('/catalog');
  };

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
      <Header />
      <div className="banner">

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/about' element={<About />} />
          <Route path='/catalog' element={<Catalog books={books}/>} />
          <Route path='/create' element={<Create onCreateBookSubmit={onCreateBookSubmit} />} />
          <Route path='/details/:bookId' element={<Details />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/edit/:bookId' element={<Edit onEditBookSubmit={onEditBookSubmit} />} />
          <Route path='/delete/:bookId' element={<Delete onDeleteBookSubmit={onDeleteBookSubmit}/>} />
        </Routes>
        <Footer />
      </div>
      </AuthContext.Provider>
    </>
    
  );
}

export default App;
