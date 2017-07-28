var React = require('react');
var ReactDOM = require('react-dom');
var {HashRouter, Link} = require('react-router-dom');
var axios = require('axios');
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import styles from '../styles/main.css';
import FontIcon from 'material-ui/FontIcon';

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
              console.log('response from /userdocs', response)
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
            console.log("DOCUMENT RESPONSE", response);
            if(response.data.success){
                console.log("created new document");
                this.setState({
                  docs: this.state.docs.concat(response.data.document),
                  title: ""})
                console.log('THIS STATE DOCS AFTER SETSTATE', this.state.docs)
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
                this.setState({
                  sharedDocs: this.state.sharedDocs.concat(response.data.doc),
                  sharedId: "" })
            }
            else {}
        })
    }

    formatTextField() {
      return (
        <TextField
            type="text"
            floatingLabelStyle={{'color': '#B39DDB'}}
            underlineFocusStyle={{'borderBottom': 'solid #000000'}}
            value={this.state.title}
            onChange={(e) => this.setState({title: e.target.value})}
            name="newDoc"
            hintText="New Document Name"
            floatingLabelText="New Document Name"
            >
        </TextField>
      )
    }

    formatFlatButton() {
      return (
        <FlatButton
            fullWidth={false}
            hoverColor='#B39DDB'
            icon={<FontIcon className="material-icons">note_add</FontIcon>}
            onClick={() => this.createNewDocument()}
            >
        </FlatButton>
      )
    }

    formatDocsList() {
      return (
        <div>
            {this.state.docs.map((document) =>
                // <li key={document._id}>
                    <FlatButton
                        fullWidth={false}
                        hoverColor='#B39DDB'
                        label={document.title}
                        containerElement={<Link to={"/editorview/" + document._id}>{document.title}</Link>}
                        >
                    </FlatButton>
            )}
        </div>
      )
    }

    formatSharedDocsList() {
      return (
        <div>
        {this.state.sharedDocs.map((document) =>
                <FlatButton
                    fullWidth={false}
                    hoverColor='#B39DDB'
                    label={document.title}
                    containerElement={<Link to={"/editorview/" + document._id}>{document.title}</Link>}
                    >
                </FlatButton>
        )}
        </div>
      )
    }

    formatSharedTextField() {
      return (
        <TextField
            type="text"
            name="newDoc"
            floatingLabelText="Document ID"
            hintText="Document ID"
            floatingLabelStyle={{'color': '#B39DDB'}}
            value={this.state.sharedId}
            underlineFocusStyle={{'borderBottom': 'solid #000000'}}
            onChange={(e) => this.setState({sharedId: e.target.value})}
        >
        </TextField>
      )
    }

    formatSharedFlatButton() {
      return (
        <FlatButton
            fullWidth={false}
                hoverColor='#B39DDB'
                icon={<FontIcon className="material-icons">fingerprint</FontIcon>}
                onClick={() => this.addSharedDoc()}
                >
        </FlatButton>
      )
    }

    render() {
        return (
            <HashRouter>
                <div>
                    <center>
                        <h1>C U R L D O C S</h1>
                    </center>
                    <div style={{'padding': '15'}}>
                      <div className='portalbox'>
                        <h3>YOUR DOCS</h3>
                        {this.formatDocsList()}
                        {this.formatTextField()}
                        {this.formatFlatButton()}
                      </div>
                      <div>
                        <h3>SHARED DOCS</h3>
                        {this.formatSharedDocsList()}
                        {this.formatSharedTextField()}
                        {this.formatSharedFlatButton()}
                      </div>
                    </div>
                    </div>
            </HashRouter>
        )
    }
}

module.exports = Portal;
