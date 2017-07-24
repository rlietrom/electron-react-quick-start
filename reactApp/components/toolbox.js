import React from 'react';
//import styles from '../styles.css';

class Toolbox extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <div>
        <button onClick={() => this.props.clickHandler("BOLD").bind(this)}>B</button>
        <button onClick={() => this.props.clickHandler("ITALIC").bind(this)}>I</button>
        <button onClick={() => this.props.clickHandler("UNDERLINE").bind(this)}>U</button>
        <button onClick={() => this.props.clickHandler("CODE").bind(this)}>code</button>
        <button onClick={() => this.props.clickHandler("STRIKETHROUGH").bind(this)}>strike</button>
        <div>This is toolbox</div>
      </div>
    )
  }
}

module.exports = Toolbox;
