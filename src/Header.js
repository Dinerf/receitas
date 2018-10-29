import React from 'react';
import './App.css';
import './Main.css';

function Header(props) {
  return (
    <header className="text-center">
      <h1>Acha-Receita</h1>
      <h4>by Microsobrevivencia</h4>
      <nav className="bg-dark">
        <div className="w-50 m-auto d-flex flex-row justify-content-between">
          <ul className="d-flex flex-row justify-content-around w-50 m-auto p-0">
            <li className="home"><a href="/home">Home</a></li>
            <li className="favorites"><a href="/favorites">Favoritos</a></li>
          </ul>
          <div className="d-flex flex-row">
            <form onSubmit={props.submit}>
              <input id="searchInput" type="text" placeholder="Digite o que procura" />
              <button id="searchBtn">Pesquisar</button>
            </form>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header;
