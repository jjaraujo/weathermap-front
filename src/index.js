import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import FindCity from './City';
import Previsao from './Previsao';
import Home from './Home';
import {Router,Route,browserHistory,IndexRoute} from 'react-router';

ReactDOM.render(
  (<Router history={browserHistory}>
      <Route path="/" component={App}>
          <IndexRoute component={Home}/>
          <Route path="/cadastrar" component={FindCity}/>
          <Route path="/previsao" component={Previsao}/>
      </Route>
  </Router>),
  document.getElementById('root')
);