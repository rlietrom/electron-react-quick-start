import React from 'react';
//import styles from '../styles.css';

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
        <div>This is toolbox</div>
      </div>
    )
  }
}

module.exports = Toolbox;
