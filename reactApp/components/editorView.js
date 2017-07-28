var React = require('react');
var Toolbox = require('./toolbox');
var ReactDOM = require('react-dom');
var {DefaultDraftBlockRenderMap, Editor, EditorState, RichUtils} = require('draft-js');
var {Editor, convertFromRaw, convertToRaw, ContentState, EditorState, AppBar, RichUtils} = require('draft-js');
const { Map } = require('immutable');
import { ChromePicker } from 'react-color'
import { Toolbar }from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import { Popover }  from 'material-ui/Popover';
import styles from '../styles/main.css';
import {Redirect, Link} from 'react-router-dom';
var axios = require('axios');
var io = require('socket.io-client'); //client side socket connection


const myBlockTypes = DefaultDraftBlockRenderMap.merge(new Map({
  right: {
    wrapper: <div className="right-align" />
  },
  center: {
    wrapper: <div className="center-align" />
  }
})
);

class EditorView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: EditorState.createEmpty(),
      inlineStyles: {},
      currentFontSize: 12,
      currentDocument: {}
    }
    // console.log("this is props id", this.props.match.params.id);
    // this.currentFontSize = 12;
    this.previousHighlight = null;
    this.socket = io('http://localhost:3000');
    //set up the listener before the emitter to prevent race conditions, and a
    //helloback returning before you set up the helloback listener
    this.socket.on('helloBack', () => {
      console.log("hello back");
    })
    this.socket.on('userJoined', () => {
      console.log("user joined");
    })
    this.socket.on('userLeft', () => {
      console.log("user left");
    })
    this.socket.on('receiveNewContent', ({stringifiedContent}) => {
      // console.log("incoming receiveNewContent stringifiedContent", stringifiedContent);

      var contentState = convertFromRaw(JSON.parse(stringifiedContent));
      var newEditorState = EditorState.createWithContent(contentState);
      this.setState({editorState: newEditorState});
    })
    this.socket.on('receiveNewCursor', incomingSelectionObj => {
      console.log('incoming selection object', incomingSelectionObj);

      let editorState = this.state.editorState;
      const ogEditorState = editorState;
      const ogSelection = editorState.getSelection();
      console.log("ogSelection", ogSelection);

      const incomingSelectionState = ogSelection.merge(incomingSelectionObj);

      const temporaryEditorState = EditorState.forceSelection(ogEditorState, incomingSelectionState);

      this.setState({ editorState : temporaryEditorState}, () => {
        //callback for once the state is set bc setState is kindof asynchronous
       const winSel = window.getSelection();
       const range = winSel.getRangeAt(0);
       const rects = range.getClientRects()[0];
       console.log("range", range);
       console.log("rects", rects);
       const { top, left, bottom } = rects;
       this.setState({ editorState: ogEditorState, top, left, height: bottom - top});
     });

   });
    //docId could be props, but I use the result of the axios request in componentDidMont
    //...which could be a problem
    this.socket.emit('join', {'docId': this.props.match.params.id});

    // backgroundColor: '#B39DDB',
    // 
    // var HIGHLIGHT = {
    //   backgroundColor: 'blue',
    // };
  }

  onChange(editorState) {
    const selection = editorState.getSelection();

    if (this.previousHighlight) {
      editorState = EditorState.acceptSelection(editorState, this.previousHighlight);
      editorState = RichUtils.toggleInlineStyle(editorState, 'HIGHLIGHT');
      editorState = EditorState.acceptSelection(editorState, selection);
      this.previousHighlight = null;
    }

    if (selection.getStartOffset() === selection.getEndOffset()) {
      console.log('cursor selection', selection);
      this.socket.emit('cursorMove', selection);
    } else {
      console.log("highlight selection", selection);
      editorState = RichUtils.toggleInlineStyle(editorState, 'HIGHLIGHT');
      this.previousHighlight = editorState.getSelection();
      // TODO:::::
      // this.socket.emit('cursorMove', {selection});
    }

    const contentState = editorState.getCurrentContent();
    // console.log("this is contentState", contentState);
    // console.log("convertToRaw", convertToRaw(contentState));
    const stringifiedContent = JSON.stringify(convertToRaw(contentState));
    // console.log("stringifiedContent", stringifiedContent);
    this.socket.emit('newContent', {stringifiedContent});
    this.setState({editorState: editorState});
  }

  componentDidMount() {
    // console.log("editorview component did mount");
    console.log("entering component did mount")
    console.log("this is props id", this.props.match.params.id);

    var link = 'http://localhost:3000/currentdocument/' + this.props.match.params.id;
    // console.log("this is link", link);
    axios({
      method: 'GET',
      url: link,
    })
    .then(response => {
      if(this.IsJsonString(response.data.currentDocument.content)){
        this.setState({currentDocument: response.data.currentDocument});
        this.setState({editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(response.data.currentDocument.content)))})
      } else {
        // this.currentDocument = response.data.currentDocument;
        this.setState({
          currentDocument: response.data.currentDocument,
          editorState: EditorState.createEmpty()
        })
      }
    })
  }

  componentWillUnmount() {
    this.socket.emit('disconnect');
  }

  onSave() {
    axios({
      method: 'POST',
      url: 'http://localhost:3000/savedocument',
      data: {
        documentId: this.state.currentDocument._id,
        content: JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()))
      }
    })
    .then(response => {
      // console.log(response);
      if(response.data.success){
        console.log('Document saved');
      }
      else {
        console.log("Error saving document");
      }
    })

  }

  toggleFormat(e, style, block) {
    e.preventDefault();
    if(block) {
      this.setState({
        editorState: RichUtils.toggleBlockType(this.state.editorState, style)})
      }
      else {
        this.setState({
          editorState: RichUtils.toggleInlineStyle(this.state.editorState, style)
        })
      }
    }

    formatButton({icon, style, block}) {
      return (
        <FlatButton
          fullWidth={false}
          backgroundColor={this.state.editorState.getCurrentInlineStyle().has(style) ? 'WhiteSmoke' : 'white'}
          onMouseDown={(e) => this.toggleFormat(e, style, block)}
          icon={<FontIcon className="material-icons">{icon}</FontIcon>}
        />
      )
    }

    openColorPicker(e) {
      this.setState({
        colorPickerOpen: true,
        colorPickerButton: e.target
      })

    }
    closeColorPicker(e) {
      this.setState({
        colorPickerOpen: false,
        // colorPickerButton: e.target()
      })
    }

    formatColor(color) {
      var newInlineStyles = Object.assign(
        {},
        this.state.inlineStyles,
        {
          [color.hex]: {
            color: color.hex
          }
        }
      )
      this.setState({
        inlineStyles: newInlineStyles,
        editorState: RichUtils.toggleInlineStyle(this.state.editorState, color.hex),
        color: color
      })
    }

    colorPicker() {
      return(
        <div style={{display: 'inline-block'}}>
          <FlatButton
            fullWidth={false}
            label=""
            onClick={this.openColorPicker.bind(this)}
            icon={<FontIcon className="material-icons">format_paint</FontIcon>}
          />
          <Popover
            open={this.state.colorPickerOpen}
            anchorEl={this.state.colorPickerButton}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={this.closeColorPicker.bind(this)}
            >
              <ChromePicker
                color={ this.state.color }
                onChangeComplete={this.formatColor.bind(this)}/>
              </Popover>
            </div>
          )
        }

        applyIncreaseFontSize(shrink) {
          // console.log("test", shrink)
          var newFontSize = this.state.currentFontSize + (shrink ? -4 : 4);
          var newInlineStyles = Object.assign(
            {},
            this.state.inlineStyles,
            {
              [newFontSize]: {
                fontSize: `${newFontSize}px`
              }
            }
          )
          // console.log("shrink", shrink)
          this.setState({
            inlineStyles: newInlineStyles,
            editorState: RichUtils.toggleInlineStyle(this.state.editorState, String(newFontSize)),
            currentFontSize: newFontSize
          })
        }

        increaseFontSize(shrink) {
          return (
            <FlatButton
              fullWidth={false}
              label=""
              onMouseDown={this.applyIncreaseFontSize.bind(this, shrink)}
              icon={<FontIcon className="material-icons">{shrink ? 'zoom_in' : 'zoom_out'}</FontIcon>}
            />
          )
        }

        IsJsonString(str) {
          try {
            JSON.parse(str);
          } catch (e) {
            return false;
          }
          return true;
        }

        // onSave() {
        //   console.log("this is currentContent", this.state.editorState.getCurrentContent());
        // }

        render() {
          return (
            <div>
              <div className="toolbar">
                {this.formatButton({icon: 'format_bold', style:'BOLD'})}
                {this.formatButton({icon: 'format_italic', style:'ITALIC'})}
                {this.formatButton({icon: 'format_underline', style: 'UNDERLINE'})}
                {this.formatButton({icon: 'format_strikethrough', style: 'STRIKETHROUGH'})}
                {this.formatButton({icon: 'code', style: 'CODE'})}
                {this.colorPicker()}
                {this.formatButton({icon: 'format_list_numbered', style: 'ordered-list-item', block: true})}
                {this.formatButton({icon: 'list', style: 'unordered-list-item', block: true})}
                {this.formatButton({icon: 'format_align_left', style: 'unstyled', block: true})}
                {this.formatButton({icon: 'format_align_center', style: 'center', block: true})}
                {this.formatButton({icon: 'format_align_right', style: 'right', block: true})}
                {this.increaseFontSize(false)}
                {this.increaseFontSize(true)}
              </div>
              <div className='editor'>
                <Editor
                  ref="editor"
                  customStyleMap={this.state.inlineStyles}
                  editorState={this.state.editorState}
                  onChange={(editorState) => this.onChange(editorState)}
                  blockRenderMap={myBlockTypes}
                />
              </div>
              <div>
                <FlatButton
                  onClick={() => this.onSave()}
                  label="Save">
                </FlatButton>
                <FlatButton
                  fullWidth={false}
                  onClick={() => this.onSave()}
                  label="Save and Return to Menu"
                  containerElement={<Link to="/portal" />}
                  >
                </FlatButton>
              </div>
            </div>
          )
        }
      }

      module.exports = EditorView;
