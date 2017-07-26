var React = require('react');
var ReactDOM = require('react-dom');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
var injectTapEventPlugin = require('react-tap-event-plugin')
// var EditorView = require('./components/editorView');
/* This can check if your electron app can communicate with your backend */
// fetch('http://localhost:3000')
// .then(resp => resp.text())
// .then(text => console.log(text))
// .catch(err => {throw err})
injectTapEventPlugin();

require('./styles/main.css')
import EditorView from './components/editorView'
ReactDOM.render(
  <MuiThemeProvider>
    <EditorView/>
  </MuiThemeProvider>,
   document.getElementById('root'));
