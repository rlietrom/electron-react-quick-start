var React = require('react');
var ReactDOM = require('react-dom');
var axios = require('axios');

class Portal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: ""
    }
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
      // if(response.){
      //   console.log("created new document")
      // } else {
      //   console.log("failed to create new doc");
      // }
    })
  }

  render() {
    return (
      <div>
        <h1>(Username's) Portal:</h1>
        <input type="text" onChange={(e) => this.setState({title: e.target.value})}
          name="newDoc" placeholder="Enter new document name..."></input>
        <button onClick={() => this.createNewDocument()}>Create a new document (unimplemented)</button>
        <div>
          <h3>Your documents: </h3>
          <ul>
            <li >list1</li>
            <li>list2</li>
            <li>list3</li>
          </ul>
        </div>
        <input type="text" name="newDoc" placeholder="Enter document ID to get access to shared file"></input>
        <button>Create a new document (unimplemented)</button>
      </div>
    )
  }
}

module.exports = Portal;
