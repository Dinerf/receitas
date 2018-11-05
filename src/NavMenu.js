import React from 'react';
import './App.css';
import './Main.css';

function NavMenu(props) {
  return (
    <nav className="d-flex flex-row justify-content-between bg-dark p-2 nav-menu">
      {props.children}
    </nav>
  )
}

export default NavMenu;
