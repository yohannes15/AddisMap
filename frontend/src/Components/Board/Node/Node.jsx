import React, { Component } from 'react';

import './Node.css';

export default class Node extends Component {
  render() {
    const {
      col,
      isFinish,
      isStart,
      isWall,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
      row,
      id,
    } = this.props;
    let extraClassName = '';
    if (isFinish) {
      extraClassName += 'finish ';
    }
    if (isStart) {
      extraClassName += 'start ';
    } if (isWall) {
      extraClassName += 'wall ';
    }

    return (
      <td
        id={`node-${id}`}
        className={`node ${extraClassName}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}>
      </td>
    );
  }
}
