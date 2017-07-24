import React from 'react';
//import styles from '../styles.css';

class Toolbox extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <div>
        <button onClick={() => this.props.clickHandler("BOLD").bind(this)}>Bold</button>
        {/* <button onClick={() => this.props.clickHandler("ITALICS")}/> */}
        <div>This is toolbox</div>
      </div>
    )
  }
}

module.exports = Toolbox;
