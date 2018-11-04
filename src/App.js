import React, { Component } from 'react';
import './Main.css';
import AppHeader from './AppHeader.js';
import Main from './Main.js';
import VideoCard from './VideoCard';
import VideoModal from './VideoModal';
import Footer from './Footer.js';
import MediaQuery from 'react-responsive';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleModalClick = this.handleModalClick.bind(this);
    this.state = {
      videos: [],
      userFavorites: [],
      isModalVisible: false,
      modalProps: {},
    };
  }

  getData = (event) => {
    event.preventDefault();
    fetch('https://www.googleapis.com/youtube/v3/search?key=AIzaSyD-04v3PiDQtL-FDdupbdZ7CjkeVgc1t_o&part=snippet&channelId=UC0nY9haTmlxXRTyeXqoKWIQ&maxResults=30&q=' + document.getElementById('searchInput').value)
      .then(res => res.json())
        .then((data) => {
          this.setState({videos: data.items})
        })
    document.getElementById('searchInput').value = ''
  }

  componentDidMount() {
    if (localStorage.getItem("userFavorites") === null) {
      localStorage.setItem("userFavorites", "[]");
    }
    this.setState({userFavorites: JSON.parse(localStorage.getItem('userFavorites'))})
    console.log(this.state.modalDescription);
    
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

  async handleModalClick(event) {
    const lala = await {
      modalDescription: event.target.dataset['description'],
      modalVideoId: event.target.id,
      modalTtitle: event.target.dataset['title'],
      modalUrl: event.target.dataset['url']
    }
    // this.setState({modalProps: lala})
    // this.setState({modalVideoId: event.target.id});
    // this.setState({modalTtitle: event.target.dataset['title']});
    // this.setState({modalUrl: event.target.dataset['url']});

    console.log(lala);
    this.teste(event)
  }

  teste = (event) => {
    this.setState(prevState => {
      return {isModalVisible: !prevState.isModalVisible}
    })
    console.log(this.state.modalDescription);
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <AppHeader click={this.saveNewFavorites} submit={this.getData} />
          <Main>
            <Switch>
              <Route path='/' exact component={ () => this.state.videos.map(video =>
                <VideoCard handleMouseClick={this.handleModalClick} url={video.snippet.thumbnails.medium.url} title={video.snippet.title} description={video.snippet.description} videoId={video.id.videoId} key={video.id.videoId}>
                  {/* <InteractiveIcon iconId={}  iconClass={} title={} description={} url={} /> */}
                </VideoCard>
              )} />
              <Route path='/favorites' render={ () => this.state.userFavorites.map(userFavorite =>
                <VideoCard  delClick={this.handleDeleteClick} url={userFavorite.url} title={userFavorite.title} description={userFavorite.description} key={userFavorite.videoId}>
                  {/* <InteractiveIcon iconId={}  iconClass={} title={} description={} url={} /> */}
                </VideoCard>
              )} />
            </Switch>
            <MediaQuery query="(max-device-width: 768px)">
              {
                this.state.isModalVisible &&
                <VideoModal url={this.state.modalUrl} title={this.state.modalTitle} description={this.state.modalDescription }/>
              }
            </MediaQuery>
          </Main>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;