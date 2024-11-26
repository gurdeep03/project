import logo from "./images/logo_text.png";
import { Link } from 'react-router-dom';
import './App.css';

const Navbar = () => {
  return (
   
      <div className="navbar-container">
        <div className="navbar">
          <div className="cont1">
            <img src={logo} alt="Logo" />
          </div>
          <div className="cont2">
            <Link to="/">Home</Link>
            <Link to="/recommended">Recommended</Link>
            <div
              className="bookshelf">
              <Link to="/bookshelf">Bookshelf</Link>
            </div>
            <Link to="/my-library">My Library</Link>
          </div>
          <div className="cont3">
            <Link to="/login">Login</Link>
            <Link to="/register">Sign up</Link>
          </div>
        </div>

      </div>
      
     
  );
};

export default Navbar;