import React from 'react';
import './App.css';
import './Main.css';
import SearchBar from './SearchBar.js';
import NavMenu from './NavMenu.js';
import {Link} from 'react-router-dom';

function AppHeader(props) {
  return (
    <header className="text-center">
      <h1>Acha-Receita</h1>
      <h4>by Microsobrevivencia</h4>
      <NavMenu>
        <Link to='/' className="navOption">Home</Link>
        <Link to='/favorites' onClick={props.click} className="navOption">Favoritos</Link>
        <SearchBar submit={props.submit}/>
      </NavMenu>
    </header>
  )
}

export default AppHeader;
