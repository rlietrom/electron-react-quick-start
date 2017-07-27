var React = require('react');
var ReactDOM = require('react-dom');
var {HashRouter, Link} = require('react-router-dom');
var axios = require('axios');
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import styles from '../styles/main.css';

class Portal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      sharedId: "",
      docs: [],
      sharedDocs: []
    }
  }

  componentDidMount() {
    //axios get request
    // console.log("inside componentDidMount");
    console.log("inside componentDidMount");
    axios({
      method: 'GET',
      url: 'http://localhost:3000/userdocuments',
    })
    .then(response => {
      if(response.data.success){
        this.setState({docs: response.data.docs});
      } else {
        console.log("failed to create new doc");
      }
    })
    console.log("firing off second Axios(post) request");
    axios({
      method: 'GET',
      url: 'http://localhost:3000/usershareddocuments'
    })
    .then(response => {
      console.log("this is response to second request", response);
      if(response.data.success){
        console.log("inside second get request");
        this.setState({sharedDocs: response.data.sharedDocs});
      } else {
        console.log("failed to create new doc");
      }
    })
  }

  createNewDocument() {
    axios({
      method: 'POST',
      url: 'http://localhost:3000/createnewdocument',
      data: {
        title: this.state.title,
      }
    })
    .then(response => {
      console.log(response);
      if(response.data.success){
        console.log("created new document");
        this.componentDidMount();
      } else {
        console.log("failed to create new doc");
      }
    })
  }

  addSharedDoc() {
    console.log("entering addSharedDoc");
    axios({
      method: 'POST',
      url: 'http://localhost:3000/newcollaborator',
      data: {
        _id: this.state.sharedId,
      }
    })
    .then(response => {
      console.log("this is response from server", response);
      if(response.data.success) {
        console.log("inside success");

        this.componentDidMount();
      }
      else {}
    })
  }

  render() {
    return (
      <HashRouter>
        <div>
          <center>
          <h1>C U R L D O C S</h1>
          </center>
          <br/>
          <h3>MAKE A DOC</h3>
          <TextField
            type="text"
            onChange={(e) => this.setState({title: e.target.value})}
            name="newDoc"
            hintText="New Document Name"
            >
          </TextField>
          <FlatButton
            fullWidth={false}
            label="New Doc"
            onClick={() => this.createNewDocument()}
          >
          </FlatButton>
          <br/>
          <div>
            <h3>YOUR DOCS</h3>
            <ul>
              {this.state.docs.map((document) => <li key={document._id}><Link to={"/editorview/" + document._id}>{document.title}</Link></li>)}
            </ul>
          </div>
          <div>
            <br/>
            <h3>SHARED DOCS</h3>
            <ul>
              {this.state.sharedDocs.map((document) => <li key={document._id}><Link to={"/editorview/" + document._id}>{document.title}</Link></li>)}
            </ul>
            <TextField
              type="text"
              name="newDoc"
              placeholder="Document ID"
              onChange={(e) => this.setState({sharedId: e.target.value})}
              >
              </TextField>
            <FlatButton
              fullWidth={false}
              label="ADD"
              onClick={() => this.addSharedDoc()}
              >
            </FlatButton>
          </div>
        </div>
      </HashRouter>
    )
  }
}

module.exports = Portal;
