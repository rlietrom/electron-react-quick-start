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
var axios = require('axios');


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
    this.onChange = (editorState) => this.setState({editorState});
    console.log(this.props.match.params.id);
  }

  componentDidMount() {
    // console.log("editorview component did mount");
    var link = 'http://localhost:3000/currentdocument/' + this.props.match.params.id;
    console.log("this is link", link);
    axios({
      method: 'GET',
      url: link,
    })
    .then(response => {
      if(this.IsJsonString(response.data.currentDocument.content)){
        this.setState({currentDocument: response.data.currentDocument});
        this.setState({editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(response.data.currentDocument.content)))})
      } else {
        this.setState({
          currentDocument: response.data.currentDocument,
          editorState: EditorState.createEmpty()
        })
      }
    })
  }

  onSave() {
    // console.log("this is state.currentDocument", this.state.currentDocument);
    // console.log("this is currentContent", JSON.stringify(this.state.editorState.getCurrentContent()));
    axios({
        method: 'POST',
        url: 'http://localhost:3000/savedocument',
        data: {
            documentId: this.state.currentDocument._id,
            content: JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()))
        }
    })
    .then(response => {
        console.log(response);
        if(response.data.success){
            console.log('updated the document');
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
          hoverColor='#B39DDB'
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
            hoverColor='#B39DDB'
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
              hoverColor='#B39DDB'
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
                  onChange={this.onChange}
                  blockRenderMap={myBlockTypes}
                />
              </div>
              <br/>
              <center>
              <FlatButton hoverColor='#B39DDB' onClick={() => this.onSave()}>S A V E</FlatButton>
            </center>
            </div>
          )
        }
      }

      module.exports = EditorView;
