var React = require('react');
var Toolbox = require('./toolbox');
var ReactDOM = require('react-dom');
var {Editor, EditorState, AppBar, RichUtils} = require('draft-js');
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
    if(btn === 'PINK'){
      this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'PINK'));
    }
  }

  render() {
    return (
      <div>
        {/* <AppBar title={"Team Curl"}/> */}
        <h1>sampleDocumnent(unimplemented)</h1>
        <p>Shareable Document ID: 123456789(unimplemented)</p>
        <button>Save Changes (unimplemented)</button>
        {/* <button onClick={this._onBoldClick.bind(this)}>Bold</button> */}
        <div className='editor'>
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          customStyleMap={styleMap}/>
        </div>
        <Toolbox clickHandler={(btn) => this.clickHandler(btn)}/>
      </div>
    )
  }
}

const styleMap = {
  'STRIKETHROUGH': {
    textDecoration: 'line-through',
  },
  'PINK': {
    color: '#F176A7'
  }
}

module.exports = EditorView;
