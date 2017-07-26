var React = require('react');
var Toolbox = require('./toolbox');
var ReactDOM = require('react-dom');
var {DefaultDraftBlockRenderMap, Editor, EditorState, RichUtils} = require('draft-js');
var {Editor, EditorState, AppBar, RichUtils} = require('draft-js');
const { Map } = require('immutable');
import { ChromePicker } from 'react-color'
import { Toolbar }from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import { Popover }  from 'material-ui/Popover';
import styles from '../styles/main.css';
//import styles from '../styles.css';


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
      currentFontSize: 12
    }
    this.onChange = (editorState) => this.setState({editorState});
    // this.onTab = (e) => this._onTab(e);
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
      </div>
    )
  }
}

// export default EditorView;

// const styleMap = {
//   'STRIKETHROUGH': {
//     textDecoration: 'line-through',
//   },
//   'PINK': {
//     color: '#F176A7'
//   },
//   'LARGE': {
//     fontSize: '24'
//   }
// };
//




// Include 'paragraph' as a valid block and updated the unstyled element but
// keep support for other draft default block types
// const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);





// clickHandler(btn) {
// //   if(btn === 'BOLD'){
// //     this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
// //   }
// //   if(btn === 'ITALIC'){
// //     this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
// //   }
// //   if(btn === 'UNDERLINE'){
// //     this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
// //   }
// //   if(btn === 'CODE'){
// //     this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'CODE'));
// //   }
// //   if(btn === 'STRIKETHROUGH'){
// //     this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'STRIKETHROUGH'));
// //   }
// //   if(btn === 'PINK'){
// //     this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'PINK'));
// //   }
// //   if(btn === 'LARGE'){
// //     this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'LARGE'));
// //   }
// //   if(btn === 'right'){
// //     this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'rightDiv'));
// //   }
// //   if(btn === 'center'){
// //     this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'centerDiv'));
// //   }
// //   // if(btn === 'bullets'){
// //   //   console.log('bullets!!!!!')
// //   //   this.onChange(RichUtils.onTab(btn, this.state.editorState, 4));
// //   // }
// // }
// //
// // _onTab(e) {
// //   const maxDepth = 4;
// //   this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
// // }
// //
// //
// //
// // myBlockStyleFn(contentBlock) {
// //   const type = contentBlock.getType();
// //   if (type === 'rightDiv') {
// //     return 'align-right';
// //   }
// //   if(type === 'centerDiv') {
// //     return 'center';
// //   }
// //   return null;
// // }
//
//
// //this.refs.editor.focus()
// //react-color for the color picker
// // npm install react-color
//
//
// // this.increaseFontSize()
// //
// // increaseFontSize() {
// //   //paste raised button, change icon
// // }
// //
// // applyIncreaseFontSize(shrink) {
// //   var newFontSize = this.state.currentFontSize + (shrink ? 4 : -4);
// //   var newInlineStyles = Object.assign(
// //     {],
// //     this.state.inlineStyles,
// //   {
// //     [newFontSieze]: {
// //       fonteSize: `${newFontSieze}px`
// //     }
// //   }}
// //   )
// //
// //   this.setState({
// //     inlineStyles: newINlineStyles,
// //     //state
// //     //
// //
// //   })
// //   return (
// //     //raised button
// //     //change onMouseDown
// //   )
// // })
//
//
//
//
//   // toggleColorPicker(e) {
//   //   this.setState({
//   //     colorPickerOpen: true,
//   //     colorPickerButton: e.target
//   //   })
//   // }
//   //
//   // closeColorPicker() {
//   //   this.setState( {
//   //     colorPickerOpen: false
//   //   })
//   // }
//   //
//   // formatColor(color) {
//   //   console.log('COLOR IS', color)
//   //   //creat a style for color
//   //   //use RichUtils to apply new style
//   //   var newnewinlineStyles = Object.assign(
//   //     {},
//   //   this.state.inlineStyles,
//   //   {
//   //     [color.hex] : {
//   //       color: color.hex,
//   //       fontWeight: 'bold'
//   //     }
//   //   })
//   //   }
//   //   this.setState({
//   //     inlineStyles: newnewinlineStyles,
//   //     editorState: RichUtils.toggleInlineStyle(this.state.editorState, color.hex)
//   //   })
//   // }
//   //
//   //
//   // toggleFormat({icon, style, block}) {
//   //   return (
//   //
//   //   )
//   // }
//
//   // toggleBulletPoints(){
//   //   this.setState({
//   //       RichUtils.toggleBlockType(
//   //           this.state.editorState,
//   //           'unordered-list-item'
//   //       )
//   //   })
//   // }
// const styleMap = {
//   'STRIKETHROUGH': {
//     textDecoration: 'line-through',
//   },
//   'PINK': {
//     color: '#F176A7'
//   }
// }
module.exports = EditorView;
