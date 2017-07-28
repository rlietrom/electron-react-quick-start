import React from 'react';
var ReactDOM = require('react-dom');
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';
import {Editor, convertFromRaw, convertToRaw, ContentState, EditorState, AppBar, RichUtils} from 'draft-js';


class HistoryList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentDocument: {},
      arr: ["somebody", "once", "told me", "the", "world", "was", "gonna", "roll me"],
      name: "My life Story",
      editorState: {}
    }
  }
  //to localeDateString

  componentDidMount() {
    //axios get request
    //returns the whole document models
    // console.log("entering componentDidMount")
    // console.log("this is props id", this.props.match.params.id);
    // var link = 'http://localhost:3000/currentdocument/' + this.props.match.params.id;
    // console.log("this is link", link);
    // axios({
    //   method: 'GET',
    //   url: link,
    // })
    // .then(response => {
    //   if(this.IsJsonString(response.data.success)){
    //     this.setState({currentDocument: response.data.currentDocument});
    //     // this.setState({editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(response.data.currentDocument.content)))})
    //   } else {
    //     // this.currentDocument = response.data.currentDocument;
    //     console.log("there was an error retreiving documents from archives");
    //       // editorState: EditorState.createEmpty()
    //   }
    // })
  }

  render() {
    return(
      <div>
        <h1>Version Histories: {this.state.name}</h1>
        <Editor
          ref="editor"
          customStyleMap={this.state.inlineStyles}
          editorState={this.state.editorState}
          blockRenderMap={myBlockTypes}
        />
        <List>
          {this.state.arr.map(str => <ListItem
            primaryText={str}
            secondaryText={Date.now()}
            hoverColor="#B39DDB"
          />)}
        </List>
      </div>
    )
  }
}

export default HistoryList;




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
// export default HistoryList;
