var React = require('react');

var ReactDOM = require('react-dom');
var {DefaultDraftBlockRenderMap, Editor, EditorState, RichUtils} = require('draft-js');
const { Map } = require('immutable');
var injectTapEventPlugin = require('react-tap-event-plugin')
var { ChromePicker } = require('react-color')
var FlatButton = require('material-ui/FlatButton')

class Toolbox extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <div>
        <button onClick={() => this.props.clickHandler("BOLD")}>B</button>
        <button onClick={() => this.props.clickHandler("ITALIC")}>I</button>
        <button onClick={() => this.props.clickHandler("UNDERLINE")}>U</button>
        <button onClick={() => this.props.clickHandler("CODE")}>code</button>
        <button onClick={() => this.props.clickHandler("STRIKETHROUGH")}>strike</button>
        <button onClick={() => this.props.clickHandler("PINK")}>pink</button>
        <button onClick={() => this.props.clickHandler("LARGE")}>+</button>
        <button onClick={() => this.props.clickHandler("right")}>right</button>
        <button onClick={() => this.props.clickHandler("center")}>center</button>
        {/* <button onClick={() => this.props.toggleBulletPoints()}>bullets</button> */}
        <button onClick={() => this.props.clickHandler("bullets")}>bullets</button>
        <div>This is toolbox</div>
      </div>
    )
  }
}

module.exports = Toolbox;
