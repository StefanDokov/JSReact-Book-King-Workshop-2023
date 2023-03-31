import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
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
import { BookProvider } from './contexts/BookContext';
import { ErrorPage } from './components/404/ErrorPage';
import { RouteGuard } from './components/guards/RouteGuard';
import { BookOwner } from './components/guards/BookOwner';


function App() {
  

  return (
    
    
    <AuthProvider>
      <BookProvider>
      <Header />
      <div className="banner">

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/about' element={<About />} />
          <Route path='/catalog' element={<Catalog />} />

          <Route element={<RouteGuard />}>
           <Route path='/create' element={<Create />} />
           <Route path='/profile' element={<Profile />} /> 
           <Route path='/edit/:bookId' element={<Edit  />} />
           <Route path='/delete/:bookId' element={<Delete />} />  
          </Route>
          
          <Route path='/details/:bookId' element={<Details />} />
          <Route path='/404' element={<ErrorPage  />} />
          <Route path='*' element={<ErrorPage  />} />
        </Routes>
        <Footer />
      </div>
      </BookProvider>
      </AuthProvider>
    
    
  );
}

export default App;
