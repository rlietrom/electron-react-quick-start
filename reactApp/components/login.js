var React = require('react');
var ReactDOM = require('react-dom');
var {Redirect, Link, HashRouter} = require('react-router-dom')
var Registration = require('./registration');
var axios = require('axios');
var Portal = require('./portal');


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
    console.log("entering onSubmit");
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
          <h1>Welcome to docs.curl.com! Please log in:</h1>
          <input onChange={(e) => this.setState({username: e.target.value})} type="text" name="username" placeholder="Username..."></input>
          <input onChange={(e) => this.setState({password: e.target.value})} type="password" name="password" placeholder="Password..."></input>
          <button onClick={() => this.onSubmit()}>Login</button>
          <button><Link to='/register'>Click here to Register</Link></button>
        </div>
      )
    }
  }
}

module.exports = Login;
