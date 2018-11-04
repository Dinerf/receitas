import React, { Component } from 'react';
import './App.css';
import './Main.css';
import MediaQuery from 'react-responsive';
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

  handleModalClick = () => {
    this.setState(prevState => {
      return {isModalVisible: !prevState.isModalVisible}
    })
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
      <div onMouseEnter={this.handleMouseHover} onMouseLeave={this.handleMouseHover} onClick={this.props.handleMouseClick} className="m-2 p-2 video-card bg-success" style={{backgroundImage: `url(${this.props.url})`, backgroundPosition: 'bottom', backgroundSize: 'contain', backgroundRepeat: 'no-repeat'}} id={this.props.videoId} data-title={this.props.title} data-description={this.props.description} data-url={this.props.url}>
        <div className="text-center card-title align-middle">
          <h1 className="font-4vw">{this.props.title}</h1>
        </div>
        <MediaQuery query="(min-device-width: 768px)">
          {
            this.state.isHovering &&
            <div className="text-justify recipe-description p-1 d-flex flex-row">
              <p>{this.props.description}</p>
              <Route path='/' exact component={ () => 
                <i onClick={this.handleFavoriteClick} className={this.state.isFavorite ? "fas red fa-heart heart m-1" : "far fa-heart heart m-1" } id={this.props.videoId} data-title={this.props.title} data-description={this.props.description} data-url={this.props.url}></i>
              } />
              <Route path='/favorites' render={ () => 
                <i onClick={this.props.delClick} className="fas fa-trash-alt delete m-1" id={this.props.videoId} data-title={this.props.title} data-description={this.props.description} data-url={this.props.url}></i> 
              } />
            </div>
          }
        </MediaQuery>
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