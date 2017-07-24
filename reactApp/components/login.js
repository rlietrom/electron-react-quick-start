var React = require('react');
var ReactDOM = require('react-dom');


class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: ""
    }
  }

  onSubmit(){
    //submit this using an axios or fetch request to passport
    // TODO: submit username and password from state to passport route on server
  }

  render() {
    return(
      <div onSubmit={() => this.onSubmit()}>
        <h1>Welcome to docs.curl.com! Please log in:</h1>
        <input type="text" name="username" placeholder="..."></input>
        <input type="password" name="password" placeholder="..."></input>
        <button>Login</button>
        <button>Register</button>
        {/* TODO: route to register page */}
        {/* TODO: make sure these two input boxes modify the state*/}
      </div>
    )
  }
}

module.exports = Login;
