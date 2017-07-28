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
                    <br/> <br/> <br/> <br/>
                    <div style={{'padding': '35'}}>
                        <h3>MAKE A DOC</h3>
                        <TextField
                            type="text"
                            floatingLabelStyle={{'color': '#B39DDB'}}
                            underlineFocusStyle={{'borderBottom': 'solid #000000'}}
                            onChange={(e) => this.setState({title: e.target.value})}
                            name="newDoc"
                            hintText="New Document Name"
                            floatingLabelText="New Document Name"
                            >
                        </TextField>
                        <FlatButton
                            fullWidth={false}
                            hoverColor='#B39DDB'
                            icon={<FontIcon className="material-icons">note_add</FontIcon>}
                            onClick={() => this.createNewDocument()}
                            >
                        </FlatButton>
                    </div>
                    <div id="shared" style={{
                        'float':'right',
                        'position': 'absolute',
                        'left': '60%',
                        'top': '18%'
                        }}>
                    </div>
                    <br/>
                    <h3>SHARED DOCS</h3>
                    <ul style={{'listStyleType': 'none'}}>
                        {this.state.sharedDocs.map((document) =>
                            <li key={document._id}>
                                <FlatButton
                                    fullWidth={false}
                                    hoverColor='#B39DDB'
                                    label={document.title}
                                    containerElement={<Link to="/editorview">{document.title}</Link>}
                                    >
                                </FlatButton>
                            </li>
                        )}
                        {this.state.sharedDocs.map((document) => <li key={document._id}><Link to={"/editorview/" + document._id}>{document.title}</Link></li>)}
                    </ul>
                    <div>
                        <TextField
                            type="text"
                            name="newDoc"
                            floatingLabelText="Document ID"
                            hintText="Document ID"
                            floatingLabelStyle={{'color': '#B39DDB'}}
                            underlineFocusStyle={{'borderBottom': 'solid #000000'}}
                            onChange={(e) => this.setState({sharedId: e.target.value})}
                        >
                        </TextField>
                        <FlatButton
                            fullWidth={false}
                                hoverColor='#B39DDB'
                                icon={<FontIcon className="material-icons">fingerprint</FontIcon>}
                                onClick={() => this.addSharedDoc()}
                                >
                        </FlatButton>
                    </div>
                    <br/> <br/> <br/>
                    <center>
                        <h3>YOUR DOCS</h3>
                            <ul style={{'listStyleType': 'none', 'margin': '0', 'padding': '0'}}>
                                {this.state.docs.map((document) =>
                                    <li key={document._id}>
                                        <FlatButton
                                            fullWidth={false}
                                            hoverColor='#B39DDB'
                                            label={document.title}
                                            containerElement={<Link to={"/editorview/" + document._id}>{document.title}</Link>}
                                            >
                                        </FlatButton>
                                    </li>
                                    //THIS SHOULD BE IN COMPONENT DID MOUNT!!!

                                )}
                            </ul>
                    </center>
                </div>
            </HashRouter>
        )
    }
}

module.exports = Portal;
