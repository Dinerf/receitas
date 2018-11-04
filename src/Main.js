import React from 'react';
import './Main.css';

function Main(props) {
  return (
    <main  className="m-auto">
      {props.children}
    </main>
  )
}

export default Main;
