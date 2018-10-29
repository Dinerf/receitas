import React from 'react';
import './App.css';
import './Main.css';

function VideoCard(props) {
  return (
    <div className="d-flex flex-row my-3 mx-1 bg-light">
      <div className="m-auto">
      <img width="250" height="150" src={props.url}></img>
      </div>
      <div>
        <h5>{props.title}</h5>
        <p className="text-justify">{props.description}</p>
      </div>
      <i onClick={SaveFavorites} className="far fa-heart heart m-1" id={props.videoId} data-title={props.title} data-description={props.description}></i>
    </div>
  )
}

function SaveFavorites(event) {
  event.target.classList.toggle('red');
  event.target.classList.toggle('fas');
  event.target.classList.toggle('far');
  let newFavorite = {
    videoId: event.target.id,
    title: event.target.dataset.title,
    description: event.target.dataset.description
  }
  let oldFavorites = JSON.parse(localStorage.getItem('userFavorites'));
  let userFavorites;
  oldFavorites ? userFavorites = [...oldFavorites, newFavorite] : userFavorites = [newFavorite];
  localStorage.setItem('userFavorites', JSON.stringify(userFavorites));
}

export default VideoCard;