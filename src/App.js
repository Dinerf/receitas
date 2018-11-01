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

  componentDidMount() {
    if (localStorage.getItem("userFavorites") === null) {
      localStorage.setItem("userFavorites", "[]");
    }
    this.setState({userFavorites: JSON.parse(localStorage.getItem('userFavorites'))})
    console.log('mount');
  }

  saveNewFavorites = () => {
    this.setState({userFavorites: JSON.parse(localStorage.getItem('userFavorites'))})
  }

  handleDeleteClick = (event) => {
    let deleteItem = event.target.id;
    let getItems = JSON.parse(localStorage.getItem('userFavorites'));
    getItems.forEach(function(item) {    
      if (item.videoId === deleteItem) {
        getItems.splice(item, 1);
      }
    });   
    localStorage.setItem('userFavorites', JSON.stringify(getItems));
    this.setState({userFavorites: JSON.parse(localStorage.getItem('userFavorites'))})
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <AppHeader click={this.saveNewFavorites} submit={this.getData} />
          <Main>
            <Switch>
              <Route path='/' exact component={ () => this.state.videos.map(video =>
                <VideoCard url={video.snippet.thumbnails.medium.url} title={video.snippet.title} description={video.snippet.description} key={video.id.videoId}>
                  {/* <InteractiveIcon iconId={}  iconClass={} title={} description={} url={} /> */}
                </VideoCard>
              )} />
              <Route path='/favorites' render={ () => this.state.userFavorites.map(userFavorite =>
                <VideoCard  delClick={this.handleDeleteClick} url={userFavorite.url} title={userFavorite.title} description={userFavorite.description} key={userFavorite.videoId}>
                  {/* <InteractiveIcon iconId={}  iconClass={} title={} description={} url={} /> */}
                </VideoCard>
              )} />
            </Switch>
          </Main>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;