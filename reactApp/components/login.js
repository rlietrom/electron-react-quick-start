var React = require('react');
var ReactDOM = require('react-dom');
import {Link, HashRouter} from 'react-router-dom';
var Registration = require('./registration');
var axios = require('axios');


class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: ""
    }
  }

  onSubmit() {
    // Send a POST request
    console.log("entering onSubmit");
    axios({
      method: 'POST',
      url: 'http://localhost:3000/login', //need to define this route
      data: {
        username: this.state.username,
        password: this.state.password, //TODO: Hash this password?
      }
    });
  }

  render() {
    return(
      <div>
        <h1>Welcome to docs.curl.com! Please log in:</h1>
        <input onChange={() => this.setState({username: this.state})} type="text" name="username" placeholder="Username..."></input>
        <input onChange={() => this.setState({password: this.state})} type="password" name="password" placeholder="Password..."></input>
        <button onClick={() => this.onSubmit()}>Login</button>
        {/* <button>Register</button> */}
        <Link to='/register'>Click here to Register</Link>
        {/* <button>Register</button> */}
        {/* <HashRouter>
          <Registration/>
        </HashRouter> */}

        {/* TODO: route to register page */}
        {/* TODO: make sure these two input boxes modify the state*/}
      </div>
    )
  }
}

module.exports = Login;
