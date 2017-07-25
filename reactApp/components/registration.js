var React = require('react');
var ReactDOM = require('react-dom');
import {Link} from 'react-router-dom';

class Registration extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: ""
    }
  }

  render() {
    return(
      <div onSubmit={() => this.onSubmit()}>
        <h1>Register here for docs.curl.com:</h1>
        <input type="text" name="username" placeholder="..."></input>
        <input type="password" name="password" placeholder="..."></input>
        <button>Register</button>
        <Link to='/login'>Click here to return to Login</Link>
      </div>
    )
  }
}

module.exports = Registration;
