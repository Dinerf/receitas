import React, { Component } from 'react';
import './App.css';
import './Main.css';
import Header from './Header.js';
import Main from './Main.js';
import VideoCard from './VideoCard';
import Footer from './Footer.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: []
    };
  }

  GetData = (event) => {
    event.preventDefault();

    fetch('https://www.googleapis.com/youtube/v3/search?key=AIzaSyD-04v3PiDQtL-FDdupbdZ7CjkeVgc1t_o&part=snippet&channelId=UC0nY9haTmlxXRTyeXqoKWIQ&maxResults=30&q=' + document.getElementById('searchInput').value)
      .then(res => res.json())
        .then((data) => {
          console.log(data.items);
          console.log(this.state.q)
          this.setState({videos: data.items})
        })
    document.getElementById('searchInput').value = ''
  }

  render() {
    return (
      <div>
       <Header submit={this.GetData}/>
       <Main>
       {this.state.videos.map(video =>
        <VideoCard url={video.snippet.thumbnails.medium.url} videoId={video.id.videoId} title={video.snippet.title} description={video.snippet.description} key={video.id.videoId} />
        )}
        </Main>
       <Footer />
      </div>
    );
  }
}

export default App;