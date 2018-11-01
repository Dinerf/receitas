import React from 'react';
import './App.css';
import './Main.css';

function SearchBar(props) {
  return (
    <form onSubmit={props.submit} className="d-flex flex-row">
      <input id="searchInput" type="text" placeholder="Digite o que procura" />
      <button id="searchBtn">Pesquisar</button>
    </form>
  )
}

export default SearchBar;