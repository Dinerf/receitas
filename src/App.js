import React, { Component } from 'react';
import './Main.css';
import AppHeader from './AppHeader.js';
import Main from './Main.js';
import VideoCard from './VideoCard';
import VideoModal from './VideoModal';

import {BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.showModal = this.showModal.bind(this);
    this.state = {
      videos: [],
      userFavorites: [],
      isModalVisible: false,
      videoId: ''
    };
  }

  getData = (event) => {
    event.preventDefault();
    fetch('https://www.googleapis.com/youtube/v3/search?key=AIzaSyD-04v3PiDQtL-FDdupbdZ7CjkeVgc1t_o&part=snippet&channelId=UC0nY9haTmlxXRTyeXqoKWIQ&maxResults=30&q=' + document.getElementById('searchInput').value)
      .then(res => res.json())
        .then((data) => {
          this.setState({videos: data.items})
        })
    document.getElementById('searchInput').value = '';
    return <Redirect to='/' />
  }

  componentDidMount() {
    if (localStorage.getItem("userFavorites") === null) {
      localStorage.setItem("userFavorites", "[]");
    }
    this.setState({userFavorites: JSON.parse(localStorage.getItem('userFavorites'))})
    
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
    this.setState({userFavorites: JSON.parse(localStorage.getItem('userFavorites'))});
  }

  async showModal(event) {
    const videoId = await this.setState({videoId: event.target.id})
    this.modalVisibility();
  }

  closeModal = () => {
    this.setState({videoId: ''})
    this.modalVisibility();
  }

  modalVisibility = () => {
    this.setState(prevState => {
      return {isModalVisible: !prevState.isModalVisible}
    })
  }

  render() {
    return (
      <BrowserRouter>
        <div className="w-100">
          <AppHeader click={this.saveNewFavorites} submit={this.getData} />
          <Main>
            <Switch>
              <Route path='/' exact component={ () => this.state.videos.map(video =>
                <VideoCard watch={this.showModal} handleMouseClick={this.handleModalClick} url={video.snippet.thumbnails.medium.url} title={video.snippet.title} description={video.snippet.description} videoId={video.id.videoId} key={video.id.videoId}>
                  {/* <InteractiveIcon iconId={}  iconClass={} title={} description={} url={} /> */}
                </VideoCard>
              )} />
              <Route path='/favorites' render={ () => this.state.userFavorites.map(userFavorite =>
                <VideoCard watch={this.showModal} delClick={this.handleDeleteClick} url={userFavorite.url} title={userFavorite.title} description={userFavorite.description} videoId={userFavorite.videoId} key={userFavorite.videoId}>
                  {/* <InteractiveIcon iconId={}  iconClass={} title={} description={} url={} /> */}
                </VideoCard>
              )} />
            </Switch>
          </Main>
          { 
            this.state.isModalVisible &&
            <VideoModal videoId={this.state.videoId} close={this.closeModal} />
          }
        </div>
      </BrowserRouter>
    );
  }
}

export default App;