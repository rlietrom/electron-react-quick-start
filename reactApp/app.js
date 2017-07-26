var React = require('react');
var ReactDOM = require('react-dom');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
var injectTapEventPlugin = require('react-tap-event-plugin')
// var EditorView = require('./components/editorView');
import {Switch, Redirect, Route, HashRouter, BrowserRouter} from 'react-router-dom';
var EditorView = require('./components/editorView');
var Login = require('./components/login');
var Registration = require('./components/registration');
var Portal = require('./components/portal');
require('./styles/main.css')
// import EditorView from './components/editorView'

/* This can check if your electron app can communicate with your backend */
// fetch('http://localhost:3000')
// .then(resp => resp.text())
// .then(text => console.log(text))
// .catch(err => {throw err})
injectTapEventPlugin();

ReactDOM.render(
  <HashRouter>
    <MuiThemeProvider>
      <div>
        <Switch>
          <Redirect from='/' to ='/login' strict />
        </Switch>
        <Route strict path='/login' component={Login}/>
        <Route path='/register' component={Registration}/>
        <Route path='/portal' component={Portal}/>
        <Route path='/editorview' component={EditorView}/>
     </div>
    </MuiThemeProvider>
  </HashRouter>,
   document.getElementById('root'));
