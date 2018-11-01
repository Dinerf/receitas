import React, { Component } from 'react';
import './App.css';
import './Main.css';
import AppHeader from './AppHeader.js';
import Main from './Main.js';
import VideoCard from './VideoCard';
import InteractiveIcon from './InteractiveIcon';
import Footer from './Footer.js';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      userFavorites: []
    };
  }

  getData = (event) => {
    event.preventDefault();
    console.log(this.state.userFavorites);
    fetch('https://www.googleapis.com/youtube/v3/search?key=AIzaSyD-04v3PiDQtL-FDdupbdZ7CjkeVgc1t_o&part=snippet&channelId=UC0nY9haTmlxXRTyeXqoKWIQ&maxResults=30&q=' + document.getElementById('searchInput').value)
      .then(res => res.json())
        .then((data) => {
          console.log(data.items);
          console.log(this.state.q)
          this.setState({videos: data.items})
        })
    document.getElementById('searchInput').value = ''
  }

  // saveNewFavorite = (newFavorite) => {
  //   let oldFavorites = this.state.userFavorites;
  //   let userNewFavorites;
  //   userNewFavorites = oldFavorites ? [...oldFavorites, newFavorite] : [newFavorite];
  //   this.setState({userFavorites: userNewFavorites})
  // }

  componentDidMount() {
    if (localStorage.getItem("userFavorites") === null) {
      localStorage.setItem("userFavorites", "[]");
    }
    this.setState({userFavorites: JSON.parse(localStorage.getItem('userFavorites'))})
    console.log('mount');
  }

  // saveNewFavorites = () => {
  //   this.setState({userFavorites: JSON.parse(localStorage.getItem('userFavorites'))})
  // }

  render() {
    return (
      <BrowserRouter>
        <div>
          <AppHeader submit={this.getData} />
          <Main>
            <Switch>
              <Route path='/' exact component={ () => this.state.videos.map(video =>
                <VideoCard url={video.snippet.thumbnails.medium.url} videoId={video.id.videoId} title={video.snippet.title} description={video.snippet.description} key={video.id.videoId}>
                  <InteractiveIcon />
                </VideoCard>

              )} />
              <Route path='/favorites' render={ () => this.state.userFavorites.map(userFavorite =>
                <VideoCard favicon={"fas fa-trash-alt delete m-1"} url={userFavorite.url} videoId={userFavorite.videoId} title={userFavorite.title} description={userFavorite.description} key={userFavorite.videoId} />
              )} />
            </Switch>
          </Main>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

{/* <Route path='/' exact component={ () => 
  <i onClick={this.handleFavoriteClick} className={this.state.isFavorite ? "fas red fa-heart heart m-1" : "far fa-heart heart m-1" } id={this.props.videoId} data-title={this.props.title} data-description={this.props.description} data-url={this.props.url}></i>
} />
<Route path='/favorites' render={ () => 
  <i onClick={this.handleDeleteClick} className="fas fa-trash-alt delete m-1" id={this.props.videoId} data-title={this.props.title} data-description={this.props.description} data-url={this.props.url}></i>
} /> */}


export default App;