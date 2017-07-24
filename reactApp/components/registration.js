var React = require('react');
var ReactDOM = require('react-dom');

class Registration extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: ""
    }
  }

  onSubmit(){
    //submit this using an axios or fetch request to passport
    // TODO: create new account on the server
  }

  render() {
    return(
      <div onSubmit={() => this.onSubmit()}>
        <h1>Register here for docs.curl.com:</h1>
        <input type="text" name="username" placeholder="..."></input>
        <input type="password" name="password" placeholder="..."></input>
        <button>Register</button>
        <button>Go back to login</button>
        {/* TODO: route to register page */}
        {/* TODO: make sure these two input boxes modify the state*/}
      </div>
    )
  }
}

module.exports = Registration;
