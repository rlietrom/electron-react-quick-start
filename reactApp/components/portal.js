var React = require('react');
var ReactDOM = require('react-dom');
var {HashRouter, Link} = require('react-router-dom');
var axios = require('axios');

class Portal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      sharedId: "",
      docs: []
    }
  }

  componentDidMount() {
    //axios get request
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

  render() {
    return (
      <HashRouter>
        <div>
          <h1>(Username's) Portal:</h1>
          <input type="text" onChange={(e) => this.setState({title: e.target.value})}
            name="newDoc" placeholder="Enter new document name..."></input>
          <button onClick={() => this.createNewDocument()}>Create a new document (unimplemented)</button>
          <div>
            <h3>Your documents: </h3>
            <ul>
              {this.state.docs.map((document) => <li><Link to="/editorview">{document.title}</Link></li>)}
            </ul>
          </div>
          <input type="text" name="newDoc" placeholder="Enter document ID to get access to shared file"></input>
          <button>Create a new document (unimplemented)</button>
        </div>
      </HashRouter>
    )
  }
}

module.exports = Portal;
