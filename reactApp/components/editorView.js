var React = require('react');
var Toolbox = require('./toolbox');
var ReactDOM = require('react-dom');
var {Editor, EditorState} = require('draft-js');

class EditorView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: EditorState.createEmpty()
    }
    this.onChange = (editorState) => this.setState({editorState});
  }

  render() {
    return (
      <div>
        <p>HEYYY THIS IS EDITOR VIEW</p>
        <Editor editorState={this.state.editorState} onChange={this.onChange}/>
        <Toolbox/>
      </div>
    )
  }
}



module.exports = EditorView;
