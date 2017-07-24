var React = require('react');
var Toolbox = require('./toolbox');
var ReactDOM = require('react-dom');
var {RichUtils, Editor, EditorState} = require('draft-js');
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
    if(btn === "BOLD"){
      this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
    }
  }

  render() {
    return (
      <div>
        <h1>sampleDocumnent(unimplemented)</h1>
        <p>Shareable Document ID: 123456789(unimplemented)</p>
        <button>Save Changes (unimplemented)</button>
        {/* <button onClick={this._onBoldClick.bind(this)}>Bold</button> */}
        <Editor editorState={this.state.editorState} onChange={this.onChange}/>
        <Toolbox clickHandler={(btn) => this.clickHandler(btn)}/>
      </div>
    )
  }
}



module.exports = EditorView;
