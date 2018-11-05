import React, { Component } from 'react';
import './App.css';
import './Main.css';
import {Route} from 'react-router-dom';

class VideoCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovering: false
    }
  }

  handleFavoriteClick = (event) => {
    this.setState(prevState => {
      return {isFavorite: !prevState.isFavorite}
    })
    saveFavorites(event.target);
  }

  handleMouseHover = () => {
    this.setState(this.toggleHoverState);
  }

  toggleHoverState = (state) => {
    return {
      isHovering: !state.isHovering,
    };
  }

  render() {
    return (
      <div onMouseEnter={this.handleMouseHover} onMouseLeave={this.handleMouseHover} className="m-2 p-2 video-card" style={{backgroundImage: `url(${this.props.url})`, backgroundPosition: 'bottom', backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}} >
        {
          this.state.isHovering &&
          <div className="text-justify recipe-description p-1 d-flex flex-row">
            <div className="text-center card-title align-middle">
              <h6 className="">{this.props.title}</h6>
              <p className="cardDescription">{this.props.description}</p>
              {/* <span onClick={this.props.watch} id={this.props.videoId} className="navOption">Assistir</span> */}
            </div>
            <div className="d-flex flex-column justify-content-around">
              <Route path='/' exact component={ () => 
                <i onClick={this.handleFavoriteClick} className={this.state.isFavorite ? "fas red fa-heart heart m-1" : "far fa-heart heart m-1" } id={this.props.videoId} data-title={this.props.title} data-description={this.props.description} data-url={this.props.url}></i>
              } />
              <Route path='/favorites' render={ () => 
                <i onClick={this.props.delClick} className="fas fa-trash-alt delete m-1" id={this.props.videoId} data-title={this.props.title} data-description={this.props.description} data-url={this.props.url}></i> 
              } />
              <i onClick={this.props.watch} id={this.props.videoId} className="far fa-play-circle navOption m-1"></i>
            </div>
          </div>
        }
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