import React, { Component } from 'react';
import './App.css';
import './Main.css';
import {Route} from 'react-router-dom';

class VideoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavorite: false,
    }
  }

  render() {
    return (
      <div className="text-justify recipe-description p-1 d-flex flex-row">
        <p>{this.props.description}</p>
        <Route path='/' exact component={ () => 
          <i onClick={this.props.click} className={this.state.isFavorite ? "fas red fa-heart heart m-1" : "far fa-heart heart m-1" } id={this.props.videoId} data-title={this.props.title} data-description={this.props.description} data-url={this.props.url}></i>
        } />
        <Route path='/favorites' render={ () => 
          <i onClick={this.props.delClick} className="fas fa-trash-alt delete m-1" id={this.props.videoId} data-title={this.props.title} data-description={this.props.description} data-url={this.props.url}></i> 
        } />
      </div>
    )
  }
}

export default VideoModal;