import React, { Component } from 'react';
import './App.css';
import './Main.css';
import {Route} from 'react-router-dom';

class VideoCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavorite: false
    }
  }

  handleFavoriteClick = (event) => {
    this.setState(prevState => {
      return {isFavorite: !prevState.isFavorite}
    })
    saveFavorites(event.target);
  }

  render() {
    return (
      <div className="d-flex flex-row my-3 mx-1 bg-light">
        <div className="m-auto">
        <img width="250" height="150" alt="" src={this.props.url}></img>
        </div>
        <div>
          <h5>{this.props.title}</h5>
          <p className="text-justify">{this.props.description}</p>
        </div>
        <Route path='/' exact component={ () => 
          <i onClick={this.handleFavoriteClick} className={this.state.isFavorite ? "fas red fa-heart heart m-1" : "far fa-heart heart m-1" } id={this.props.videoId} data-title={this.props.title} data-description={this.props.description} data-url={this.props.url}></i>
        } />
        <Route path='/favorites' render={ () => 
          <i onClick={this.props.delClick} className="fas fa-trash-alt delete m-1" id={this.props.videoId} data-title={this.props.title} data-description={this.props.description} data-url={this.props.url}></i>
        } />
      </div>
    )
  }
}

function saveFavorites(target) {
  let newFavorite = {
    videoId: target.id,
    title: target.dataset.title,
    description: target.dataset.description,
    url: target.dataset.url
  }
  let oldFavorites = JSON.parse(localStorage.getItem('userFavorites'));
  let userFavorites;
  userFavorites = oldFavorites ? [...oldFavorites, newFavorite] : [newFavorite];
  localStorage.setItem('userFavorites', JSON.stringify(userFavorites));
}

export default VideoCard;