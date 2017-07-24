var React = require('react');
var ReactDOM = require('react-dom');
var EditorView = require('./components/editorView');
var Login = require('./components/login');
var Registration = require('./components/registration');
var Portal = require('./components/portal');

/* This can check if your electron app can communicate with your backend */
// fetch('http://localhost:3000')
// .then(resp => resp.text())
// .then(text => console.log(text))
// .catch(err => {throw err})

ReactDOM.render(<Portal/>,
   document.getElementById('root'));
