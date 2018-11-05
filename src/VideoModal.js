import React, { Component } from 'react';
import './App.css';
import './Main.css';

class VideoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavorite: false,
    }
  }

  render() {
    return (
      <div className="text-justify video-modal p-1 d-flex flex-column video-modal">
        <div className="m-auto w-100">
          <iframe width="100%" height="auto" src={"https://www.youtube.com/embed/" + this.props.videoId} title="Microsobrevivência" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
          <p onClick={this.props.close} className="navOption text-center">Fechar</p>
        </div>
      </div>
    )
  }
}

export default VideoModal;