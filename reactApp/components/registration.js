var React = require('react');
var ReactDOM = require('react-dom');
import {Link} from 'react-router-dom';
var axios = require('axios');

class Registration extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: ""
    }
  }

  onSubmit() {
    // Send a POST request
    axios({
      method: 'POST',
      url: 'http://localhost:3000/registration', //need to define this route
      data: {
        username: this.state.username,
        password: this.state.password, //TODO: Hash this password?
      }
    })
    .then(function(response){
      console.log(response)
    });
  }

  render() {
    return(
      <div>
        <h1>Register here for docs.curl.com:</h1>
        <input onChange={(event) => this.setState({username: event.target.value })} type="text" name="username" placeholder="Username..."></input>
        <input onChange={(event) => this.setState({password: event.target.value})} type="password" name="password" placeholder="Password..."></input>
        <button onClick={() => this.onSubmit()}>Register!</button>
        <button><Link to='/login'>Click here to return to Login</Link></button>
      </div>
    )
  }
}

module.exports = Registration;
