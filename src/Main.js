import React from 'react';
import './App.css';
import './Main.css';
import VideoCard from './VideoCard';

function Main(props) {
  return (
    <main  className="w-50 m-auto">
      {props.children}
    </main>
  )
}

export default Main;
