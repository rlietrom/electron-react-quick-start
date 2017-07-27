var React = require('react');
var Toolbox = require('./toolbox');
var ReactDOM = require('react-dom');
var {DefaultDraftBlockRenderMap, Editor, EditorState, RichUtils} = require('draft-js');
var {Editor, ContentState, EditorState, AppBar, RichUtils} = require('draft-js');
const { Map } = require('immutable');
import { ChromePicker } from 'react-color'
import { Toolbar }from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import { Popover }  from 'material-ui/Popover';
import styles from '../styles/main.css';


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
    }
    this.onChange = (editorState) => this.setState({editorState});
    this.previousHighlight = null;

    this.socket = io.connect('http://localhost:3000')
    this.socket.on('connect', () => {
      console.log('socket connection made')
    })
    this.socket.on('userJoined', () => {
      console.log('user joined')
    })
    this.socket.on('userLeft', () => {
      console.log('user left');
    })
    this.socket.on('receivedNewContent', stringifiedContent => {
      const ContentState = convertFromRaw(JSON.parse(stringifiedContent))
      const newEditorState = EditorState.createWithContent(contentState)
      this.setState({editorState: newEditorState})
    })
    this.socket.on('receiveNewCursor', incomingSelectionObj => {
      console.log('inc', incomingSelectionObj)

      let editorState = this.state.editorState;
      const ogEditorState = editorState
      const ogSelection = editorState.getSelection();

      const incomingSelectionState = ogSelection.merge(incomingSelectionObj)

      const temporaryEditorState = EditorState.forceSelection(ogEditorState, incomingSelectionState)

      this.setState({editorState: temporaryEditorState}, () => {
        const winSel = window.getSelection()
        const range = winSel.getRangeAt(0)
        const rects = range.getClientRects()[0]
        const { top, left, bottom } = rects
        this.setState({ editorState: ogEditorState, top, left, height: bottom - top})
      })

    })

    this.socket.emit('join', {doc: 'docIDgoeshere'})
    this.socket.on('errorMessage', message => {
      console.log('socket errror', message)
    });
  }

  onChange(editorState) {
    const selection = editorState.getSelection()

    if(this.previousHighlight) {
      editorState = EditorState.acceptSelection(editorState, this.previousHighlight)
      editorState = RichUtils.toggleInlineStyle(editorState, 'ITALIC')
      editorState = EditorState.acceptSelection(editorState, selection)
    }

    editorState = RichUtils.toggleInlineStyle(editorState, 'ITALIC')
    this.previousHighlight = editorState.getSelection(); //returns a selection state

    if(selection.getStartOffset() === selection.getEndOffset()) {
      this.socket.emit('cursorMove', selection)
    }

    const ContentState = editorState.getCurrentContent();
    const stringifiedContent = JSON.stringify(convertToRaw(ContentState))

    this.socket.emit('newContent', stringifiedContent)
    this.setState({editorState})
  }
  //socket.io
  componentDidMount() {


  }

  componentWillUnmount() {
    this.socket.disconnect();
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
          console.log("test", shrink)
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
          console.log("shrink", shrink)
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

        onSave() {
          //const ContentState = this.state.editorState.getCurrentContent()
          //const stringifiedContent = JSON.stringify(convertToRaw(ContentState))
          // const docID = this.props.match.params.dochash
          console.log("this is currentContent", this.state.editorState.getCurrentContent());

          //fetch post to send the json strifitied content in body
        }

        render() {
          return (
            <div>
              {this.state.top && (
                <div
                  style={{
                    position: 'absolute',
                    backgroundColor: 'blue',
                    width:'3px',
                    height: this.state.height;
                    top: this.state.top,
                    left: this.state.left
                  }}></div>
              )}
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
                <FlatButton onClick={() => this.onSave()}>Save Document</FlatButton>
              </div>
              <div className='editor'>
                <Editor
                  ref="editor"
                  customStyleMap={this.state.inlineStyles}
                  editorState={this.state.editorState}
                  onChange={this.onChange}
                  blockRenderMap={myBlockTypes}
                />
              </div>

            </div>
          )
        }
      }

      module.exports = EditorView;
