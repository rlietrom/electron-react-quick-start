var React = require('react');
var Toolbox = require('./toolbox');
var ReactDOM = require('react-dom');
var {Editor, EditorState, RichUtils} = require('draft-js');
//import styles from '../styles.css';

class EditorView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: EditorState.createEmpty()
    }
    this.onChange = (editorState) => this.setState({editorState});
  }

  clickHandler(btn) {
    if(btn === 'BOLD'){
      this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
    }
    if(btn === 'ITALIC'){
      this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
    }
    if(btn === 'UNDERLINE'){
      this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
    }
    if(btn === 'CODE'){
      this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'CODE'));
    }
    if(btn === 'STRIKETHROUGH'){
      this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'STRIKETHROUGH'));
    }
  }

  render() {
    return (
      <div>
        <p>HEYYY THIS IS EDITOR VIEW</p>
        <div className="box">
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          customStyleMap={styleMap}
        />
        </div>
        <Toolbox clickHandler={(btn) => this.clickHandler(btn)}/>
      </div>
    )
  }
}

const styleMap = {
  'STRIKETHROUGH': {
    textDecoration: 'line-through',
  }
}

module.exports = EditorView;
