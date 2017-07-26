var React = require('react');
var ReactDOM = require('react-dom');
import {Switch, Redirect, Route, HashRouter, BrowserRouter} from 'react-router-dom';
var EditorView = require('./components/editorView');
var Login = require('./components/login');
var Registration = require('./components/registration');
var Portal = require('./components/portal');

/* This can check if your electron app can communicate with your backend */
// fetch('http://localhost:3000')
// .then(resp => resp.text())
// .then(text => console.log(text))
// .catch(err => {throw err})

ReactDOM.render(
  <HashRouter>
    <div>
      <Switch>
        <Redirect from='/' to ='/login' strict />
      </Switch>
      <Route strict path='/login' component={Login}/>
      <Route path='/register' component={Registration}/>
      <Route path='/portal' component={Portal}/>
      <Route path='/editorview' component={EditorView}/>
    </div>
  </HashRouter>,
   document.getElementById('root'));
