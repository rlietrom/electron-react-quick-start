import React from 'react';
var ReactDOM = require('react-dom');
var axios = require('axios');
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';
import {DefaultDraftBlockRenderMap, Editor, EditorState,
  RichUtils, convertFromRaw, convertToRaw, ContentState,
  AppBar} from 'draft-js';
var {HashRouter, Link} = require('react-router-dom');
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import styles from '../styles/main.css';
import FontIcon from 'material-ui/FontIcon';


class HistoryView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentDocument: {title: "loading...", history: [{time: "00:00:00"}]},
      text: ""
      // arr: ["somebody once told me", "the world was gonna", "roll me"]
    }
    let counter = 0;
  }
  //to localeDateString

  componentDidMount() {
    // axios get request
    // returns the whole document models
    console.log("CDM")
    console.log("prop id", this.props.match.params.id);
    var link = 'http://localhost:3000/currentdocument/' + this.props.match.params.id;
    console.log("link", link);
    axios({
      method: 'GET',
      url: link,
    })
    .then(response => {
      if(response.data.success){
        console.log("this is response", response);
        // console.log("this is history0 resp", response.data.currentDocument.history[0].content.text)
        /*
        var current document --
        var temp2
        this.setState({

        })
      })
        */

        this.setState({currentDocument: response.data.currentDocument})
        this.setState({text: response.data.currentDocument.history[response.data.currentDocument.history.length - 1].content.text})


        // () => (this.setState({text: this.state.currentDocument.history[this.state.currentDocument.history.length - 1].content.text}))
        //this.setState({currentDocument: response.data.currentDocument}, () => {
        //  this.setState()
        // this.setState({text: response.data.currentDocument.history[response.data.currentDocument.history.length - 1 ].content.text});
        // this.setState({editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(response.data.currentDocument.content)))})
      } else {
        // this.currentDocument = response.data.currentDocument;
        console.log("there was an error retreiving documents from archives");
          editorState: EditorState.createEmpty()
      }
    })
  }

  changeText(timeId) {
    console.log("this is timeId", timeId);
    let newState;
    for(var i = 0; i < this.state.currentDocument.history.length - 1; i++){
      if(this.state.currentDocument.history[i].time === timeId){
        var abc = JSON.parse(this.state.currentDocument.history[i].content);
        var tempText = "";
        for(var j = 0; j < abc.blocks.length; j++){
          tempText = tempText + abc.blocks[j].text + "\n"
        }
        console.log("this is tempText", tempText);
        this.setState({text: tempText});
      }
    }
    console.log("this is newText:", this.state.text);
  }

  renderList() {
    return (
      <div>
        <List>
          {this.state.currentDocument.history.map(doc => <ListItem
            primaryText={doc.time}
            key={doc.time}
            secondaryText={this.state.currentDocument.title}
            hoverColor="#B39DDB"
            value={doc._id}
            onClick={() => this.changeText(doc.time)}
          />)}
        </List>
      </div>
    )
  }

  renderContent() {
    return (
      <div>
        <h4>Doc content:</h4>
        <h5>{this.state.text}</h5>
      </div>
    )
  }

  render() {
    return(
      <div>
        <h1>Version Histories: {this.state.currentDocument.title}</h1>
        <div>
          {this.renderContent()}
          {this.renderList()}
        </div>
        <FlatButton
          fullWidth={false}
          label="Back"
          containerElement={<Link to={"/editorview/" + this.props.match.params.id}/>}
          >
        </FlatButton>
      </div>
    )
  }
}

export default HistoryView;




// var React = require('react');
// var ReactDOM = require('react-dom');
// var {DefaultDraftBlockRenderMap, Editor, EditorState, RichUtils} = require('draft-js');
// var {List, ListItem, makeSelectable} = require('material-ui/List');
// import Avatar from 'material-ui/Avatar';
// import Subheader from 'material-ui/Subheader';
// var axios = require('axios');
// import PropTypes from 'prop-types';
// let SelectableList = makeSelectable(List);
//
// class HistoryList extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {}
//   }
//   render(){
//     return(
//       <div>
//
//           <SelectableList defaultValue={3}>
//             <Subheader>Selectable Contacts</Subheader>
//             <ListItem
//               value={1}
//               primaryText="Brendan Lim"
//               leftAvatar={<Avatar src="images/ok-128.jpg" />}
//               nestedItems={[
//                 <ListItem
//                   value={2}
//                   primaryText="Grace Ng"
//                   leftAvatar={<Avatar src="images/uxceo-128.jpg" />}
//                 />,
//               ]}
//             />
//             <ListItem
//               value={3}
//               primaryText="Kerem Suer"
//               leftAvatar={<Avatar src="images/kerem-128.jpg" />}
//             />
//             <ListItem
//               value={4}
//               primaryText="Eric Hoffman"
//               leftAvatar={<Avatar src="images/kolage-128.jpg" />}
//             />
//             <ListItem
//               value={5}
//               primaryText="Raquel Parrado"
//               leftAvatar={<Avatar src="images/raquelromanp-128.jpg" />}
//             />
//           </SelectableList>
//         </MobileTearSheet>
//       </div>
//     )
//   }
// }
//
// export default HistoryView;
