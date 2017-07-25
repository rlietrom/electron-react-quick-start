var React = require('react');
var Toolbox = require('./toolbox');
var ReactDOM = require('react-dom');
var {DefaultDraftBlockRenderMap, Editor, EditorState, RichUtils} = require('draft-js');
const { Map } = require('immutable');

var ChromePicker = require('react-color')
var FlatButton = require('material-ui/FlatButton')
var MuiThemeProvider = require( 'material-ui/styles/MuiThemeProvider' );


class EditorView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: EditorState.createEmpty(),
    }
    this.onChange = (editorState) => this.setState({editorState});
    // this.onTab = (e) => this._onTab(e);
  }

  render() {
    return (
      <div>
        <h1>EditorView</h1>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          // customStyleMap={styleMap}
          // blockStyleFn={this.myBlockStyleFn}
          // blockRenderMap={extendedBlockRenderMap}
          // onTab={this.onTab}
        />
        </div>

    )
  }
}

export default EditorView;

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
// const blockRenderMap = Map({
//   'rightDiv': {
//     element: 'div'
//   },
//   'centerDiv': {
//     element: 'center'
//   }
// });



// Include 'paragraph' as a valid block and updated the unstyled element but
// keep support for other draft default block types
// const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);


//import styles from '../styles.css';


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
//   // colorPicker() {
//   //   <RaisedButton
//   //     backgroundColor={colrs.red200}
//   //     icon={<FontIcon classname="material-cons")
//   //     onClick({this.toggleColorPicker.bind(this)}
//   //   >format_paint</FontIcon>
//   //   <Popover
//   //     ><CirclePIcker
//   //       onChangeComplete={this.}/></Popover>}
//   // }
//
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
