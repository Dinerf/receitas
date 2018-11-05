import React from 'react';
import './App.css';
import './Main.css';

function SearchBar(props) {
  return (
    <form onSubmit={props.submit}>
      <input className="bg-transparent" id="searchInput" type="text" placeholder="Digite o que procura" />
      <button id="searchBtn"><i className="fas fa-search text-secondary"></i></button>
    </form>
  )
}

export default SearchBar;