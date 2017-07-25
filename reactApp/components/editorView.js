var React = require('react');
var Toolbox = require('./toolbox');
var ReactDOM = require('react-dom');
var {DefaultDraftBlockRenderMap, Editor, EditorState, RichUtils} = require('draft-js');
const { Map } = require('immutable');

const styleMap = {
  'STRIKETHROUGH': {
    textDecoration: 'line-through',
  },
  'PINK': {
    color: '#F176A7'
  },
  'LARGE': {
    fontSize: '24'
  }
};

const blockRenderMap = Map({
  'rightDiv': {
    element: 'div'
  },
  'centerDiv': {
    element: 'center'
  }
});

// Include 'paragraph' as a valid block and updated the unstyled element but
// keep support for other draft default block types
const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);


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
    if(btn === 'LARGE'){
      this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'LARGE'));
    }
    if(btn === 'right'){
      this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'rightDiv'));
    }
    if(btn === 'center'){
      this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'centerDiv'));
    }
    if(btn === 'bullets'){
      this.onChange(RichUtils.onTab(btn, this.state.editorState, 4));
    }
  }

  _onTab(e) {
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }

  myBlockStyleFn(contentBlock) {
    const type = contentBlock.getType();
    if (type === 'rightDiv') {
      return 'align-right';
    }
    if(type === 'centerDiv') {
      return 'center';
    }
    return null;
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
          blockStyleFn={this.myBlockStyleFn}
          blockRenderMap={extendedBlockRenderMap}
          onTab={this.onTab}
        />
        </div>
        <Toolbox clickHandler={(btn) => this.clickHandler(btn)}/>
      </div>
    )
  }
}

module.exports = EditorView;
