import React, { Component } from 'react';
import './App.css';
import './Main.css';

function InteractiveIcon(props) {

  return (
    <i onClick={props.click} className={props.iconClass} id={props.iconId} data-title={props.title} data-description={props.description} data-url={props.url}></i>
  )
}

export default InteractiveIcon;