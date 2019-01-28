import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import {Link} from 'react-router';

class App extends Component {

  constructor(){
      super();
    console.log("Construtor do app"); 
    }

  render() {      
    return (
      <div id="layout">
          <a href="#menu" id="menuLink" className="menu-link">
              <span></span>
          </a>
          <div id="menu">
              <div className="pure-menu">
                  <Link className="pure-menu-heading" to="/">Previsão</Link>
                  <ul className="pure-menu-list">
                      <li className="pure-menu-item"><Link to="/cadastrar" className="pure-menu-link">Cadastrar Cidade</Link></li>
                      <li className="pure-menu-item"><Link to="/previsao" className="pure-menu-link">Previsão</Link></li>
                  </ul>
              </div>
          </div>
          <div id="main">
                {this.props.children}
          </div>   
      </div>
    );
  }
}

export default App;