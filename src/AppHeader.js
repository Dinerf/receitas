import React from 'react';
import './App.css';
import './Main.css';
import logo from './logo.png';
import SearchBar from './SearchBar.js';
import NavMenu from './NavMenu.js';
import {Link} from 'react-router-dom';

function AppHeader(props) {
  return (
    <header>
      <div className="text-center bg-black p-2">
        <img className="header-img" alt="" src={ logo } />
      </div>
      <NavMenu>
        <div>
          <Link to='/' className="navOption"><i className="fas fa-home m-2 text-success"></i></Link>
          <Link to='/favorites' onClick={props.click} className="navOption"><i className="fab fa-gratipay m-2 text-success"></i></Link>
        </div>
        <SearchBar submit={props.submit}/>
      </NavMenu>
    </header>
  )
}

export default AppHeader;
