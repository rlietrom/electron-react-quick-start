var React = require('react');
var ReactDOM = require('react-dom');
var {Redirect, Link, HashRouter} = require('react-router-dom')
var Registration = require('./registration');
var axios = require('axios');
var Portal = require('./portal');
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import styles from '../styles/main.css';
var io = require('socket.io-client'); //client side socket connection

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      loggedIn: false
    }

  }

  onSubmit() {
    // Send a POST request
    // console.log("entering onSubmit");
    axios({
      method: 'POST',
      url: 'http://localhost:3000/login',
      data: {
        username: this.state.username,
        password: this.state.password, //TODO: Hash this password?
      }
    })
    .then(response => {
      if(response.data.success){
        this.setState({loggedIn: true})
      } else {
        //log in failed
        console.log("log in failed");
      }
    })
  }

  render() {
    if(this.state.loggedIn) {
      return(
        <div>
          <Redirect to={'/portal'}/>
        </div>
      )
    } else {
      return(
        <div>
          <center>
            <br/><br/>
          <h1>C U R L D O C S</h1>
          <h3>LOGIN</h3>

          <TextField
            hintText="username"
            floatingLabelText="username"
            onChange={(e) => this.setState({username: e.target.value})}
            type="text"
            name="username"
          /><br />
          <TextField
            hintText="password"
            floatingLabelText="password"
            onChange={(e) => this.setState({password: e.target.value})}
            type="password"
            name="password"
          /><br /><br/>
          <FlatButton
            style={{'display': 'flex'}}
            fullWidth={false}
            label="Login"
            onClick={() => this.onSubmit()}
          />
          <FlatButton
            fullWidth={false}
            label="Register"
            containerElement={<Link to="/register" />}
          ></FlatButton>
          </center>
        </div>
      )
    }
  }
}

module.exports = Login;
