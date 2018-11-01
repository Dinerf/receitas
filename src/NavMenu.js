import React from 'react';
import './App.css';
import './Main.css';

function NavMenu(props) {
  return (
    <nav className="bg-dark w-50 m-auto d-flex flex-row justify-content-between">
      {props.children}
    </nav>
  )
}

export default NavMenu;
