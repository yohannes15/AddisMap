import React, { Component } from 'react';
import Node from './Node/Node';
import { dijkstra, getNodesInShortestPathOrder, animateDijkstra } from '../algorithms/dijkstra';
import { astar, getNodesInShortestPathOrderAStar, animateAStar } from '../algorithms/astar';
import ControlVisualizer from '../ControlVisualizer'

import './Board.css'

const DEFAULT_WIDTH = 40;
const DEFAULT_HEIGHT = 25;

const START_NODE_PRESSED = 'start';
const FINISH_NODE_PRESSED = 'finish';
const NORMAL_NODE_PRESSED = 'normal';

const marginBottom = {
  marginBottom : '15px'
}

const rightAlign = {
  textAlign: 'right'
}


const blueBackground = {
  backgroundColor: 'skyblue'

}

export default class Board extends Component {
  constructor() {
    super();
    this.state = {
      width: DEFAULT_WIDTH,
      height: DEFAULT_HEIGHT,
      grid: [],
      startNode: {},
      finishNode: {},
      mouseIsPressed: false,
      pressedNodeStatus: NORMAL_NODE_PRESSED,
      previousObjectNode: {},
      isAlgoProcessing: false,
      currentAlgorithm: null,
    };
  }

  componentDidMount() {
    const startNode = { x: Math.floor(Math.random() * (DEFAULT_WIDTH - 1)), y: Math.floor(Math.random() * (DEFAULT_HEIGHT - 1)) };
    const finishNode = { x: Math.floor(Math.random() * (DEFAULT_WIDTH - 1)), y: Math.floor(Math.random() * (DEFAULT_HEIGHT - 1)) };

    const grid = getInitialGrid(DEFAULT_WIDTH, DEFAULT_HEIGHT, startNode, finishNode);

    this.setState({ grid, startNode, finishNode });
  }

  handleMouseDown(row, col) {
    if (this.state.isAlgoProcessing) return;

    let startNode = this.state.startNode;
    let finishNode = this.state.finishNode;
    const node = this.state.grid[row][col];
    let previousObjectNode;

    if (node.isStart) {
      startNode = { x: col, y: row };
      previousObjectNode = node;
    }
    if (node.isFinish) {
      finishNode = { x: col, y: row };
      previousObjectNode = node;
    }

    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col, startNode, finishNode);

    this.setState({
      grid: newGrid,
      startNode,
      finishNode,
      mouseIsPressed: true,
      pressedNodeStatus: node.nodeType,
      previousObjectNode: previousObjectNode,
    });
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    if (this.state.isAlgoProcessing) return;

    let startNode = this.state.startNode;
    let finishNode = this.state.finishNode;
    let newGrid = this.state.grid;

    if (this.state.pressedNodeStatus === START_NODE_PRESSED || this.state.pressedNodeStatus === FINISH_NODE_PRESSED) {
      if (this.state.previousObjectNode
        && !((this.state.previousObjectNode.isStart && this.state.grid[row][col].isFinish)
          || (this.state.previousObjectNode.isFinish && this.state.grid[row][col].isStart))) {
        newGrid = getNewGridWithDraggedObject(this.state.grid, this.state.previousObjectNode.row, this.state.previousObjectNode.col, row, col);
        if (this.state.previousObjectNode.isStart) {
          startNode = { x: col, y: row };
        }
        if (this.state.previousObjectNode.isFinish) {
          finishNode = { x: col, y: row };
        }
      }
    } else {
      newGrid = getNewGridWithWallToggled(this.state.grid, row, col, startNode, finishNode);
    }

    this.setState({ grid: newGrid, startNode, finishNode, previousObjectNode: this.state.grid[row][col] });
  }

  handleMouseUp() {
    if (this.state.isAlgoProcessing) return;

    this.setState({ mouseIsPressed: false, pressedNodeStatus: NORMAL_NODE_PRESSED, previousObjectNode: null });
  }

  visualizeDijkstra() {
    this.setState({ isAlgoProcessing: true });
    this.clearBoard(false);
    const { grid } = this.state;
    const startNode = grid[this.state.startNode.y][this.state.startNode.x];
    const finishNode = grid[this.state.finishNode.y][this.state.finishNode.x];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder, () => this.setState({ isAlgoProcessing: false }));
  }

  visualizeAStar() {
    this.setState({ isAlgoProcessing: true });
    this.clearBoard(false);
    const { grid } = this.state;
    const startNode = grid[this.state.startNode.y][this.state.startNode.x];
    const finishNode = grid[this.state.finishNode.y][this.state.finishNode.x];
    let nodesToAnimate = [];
    astar(startNode, finishNode, nodesToAnimate, grid, '');
    const nodesInShortestPathOrder = getNodesInShortestPathOrderAStar(finishNode);
    animateAStar(nodesToAnimate, nodesInShortestPathOrder, () => { this.setState({ isAlgoProcessing: false }); console.log('called') });
    ;
  }

  render() {
    const { grid, mouseIsPressed } = this.state;

    return (
      <>
        <div className="row" style={marginBottom}>
          <div className="col-sm-4">
            <button disabled={this.state.isAlgoProcessing} style={blueBackground} className="start-button" onClick={() => this.visualizeDijkstra()}>Visualize Dijkstra's</button>
          </div>
          <div style={rightAlign} className="col-sm-4">
              <button disabled={this.state.isAlgoProcessing} style={blueBackground} className="start-button" onClick={() => this.visualizeAStar()}>Visualize A*</button>
          </div>
          <div style={rightAlign} className="col-sm-4">
              <button disabled={this.state.isAlgoProcessing} className="start-button" onClick={() => this.clearBoard(true)}>Clear Board</button>
          </div>
        </div>

        <ControlVisualizer algorithm={this.props.algorithm}/>

        
        <div className="row">
          <div className="col-sm-2"></div>
          <div className="col-sm-8">
            <table className="grid">
              <tbody>
                {grid.map((row, rowIdx) => {
                  return (
                    <tr id={`row-${rowIdx}`} key={rowIdx}>
                      {row.map((node, nodeIdx) => {
                        const { row, col, isFinish, isStart, isWall } = node;
                        return (
                          <Node
                            key={nodeIdx}
                            col={col}
                            isFinish={isFinish}
                            isStart={isStart}
                            isWall={isWall}
                            mouseIsPressed={mouseIsPressed}
                            onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                            onMouseEnter={(row, col) =>
                              this.handleMouseEnter(row, col)
                            }
                            onMouseUp={() => this.handleMouseUp()}
                            row={row}
                            id={`${row}-${col}`}></Node>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }

  clearBoard(clearWall) {
    const newGrid = this.state.grid.slice();
    const baseClasses = ['node', 'start', 'finish'];
    if (!clearWall) {
      baseClasses.push('wall');
    }

    for (let row = 0; row < this.state.height; row++) {
      for (let col = 0; col < this.state.width; col++) {
        const domElement = document.getElementById(`node-${row}-${col}`);
        if (this.state.grid[row] && this.state.grid[row][col]) {
          const node = this.state.grid[row][col];

          let intersectionList = ['node'];
          if (domElement && domElement.className) {
            intersectionList = baseClasses.filter(value => -1 !== domElement.className.split(' ').indexOf(value));
          }

          domElement.className = intersectionList.join(' ');
          const newNode = {
            ...node,
            distance: Infinity,
            startDistance: Infinity,
            visited: false,
            isVisited: false,
            previousNode: null,
            direction: null,
            totalDistance: Infinity,
            heuristicDistance: null,
            path: null,
            weight: 0,
            isWall: node.isWall ? !clearWall : node.isWall,
            status: node.isWall ? clearWall ? 'unvisited' : 'wall' : 'unvisited',
          };
          newGrid[row][col] = newNode;
        }
      }
    }
    this.setState({ grid: newGrid });
  }
}

const getInitialGrid = (width, height, startPos, finishPos) => {
  const grid = [];

  for (let row = 0; row < height; row++) {
    const currentRow = [];
    for (let col = 0; col < width; col++) {
      const node = createNode(col, row, startPos, finishPos);
      currentRow.push(node);
    }
    grid.push(currentRow);
  }
  return grid;
}

const createNode = (col, row, startPos, finishPos) => {
  const isStart = row === startPos.y && col === startPos.x;
  const isFinish = row === finishPos.y && col === finishPos.x;

  return {
    col,
    row,
    id: `${row}-${col}`,
    isStart: isStart,
    isFinish: isFinish,
    distance: Infinity,
    totalDistance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
    nodeType: isStart ? START_NODE_PRESSED : isFinish ? FINISH_NODE_PRESSED : NORMAL_NODE_PRESSED,
    direction: null,
    heuristicDistance: null,
    path: null,
    weight: 0,
    status: 'unvisited'
  };
};

const getNewGridWithWallToggled = (grid, row, col, startNode, finishNode) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  if (!(node.isStart || node.isFinish)) {
    const newNode = {
      ...node,
      isWall: !node.isWall,
      status: node.isWall ? 'unvisited' : 'wall',
    };
    newGrid[row][col] = newNode;
  }
  return newGrid;
};

const getNewGridWithDraggedObject = (grid, prevRow, prevCol, currentRow, currentCol) => {
  const newGrid = grid.slice();
  const prevNode = newGrid[prevRow][prevCol];
  const currentNode = newGrid[currentRow][currentCol];
  if (prevNode.isStart) {
    const newPrev = {
      ...prevNode,
      isStart: false,
      nodeType: NORMAL_NODE_PRESSED,
    };
    const newCurrent = {
      ...currentNode,
      isStart: true,
      nodeType: START_NODE_PRESSED,
      isWall: currentNode.isWall ? false : currentNode.isWall,
    };
    newGrid[prevRow][prevCol] = newPrev;
    newGrid[currentRow][currentCol] = newCurrent;
  }
  if (prevNode.isFinish) {
    const newPrev = {
      ...prevNode,
      isFinish: false,
      nodeType: NORMAL_NODE_PRESSED,
    };
    const newCurrent = {
      ...currentNode,
      isFinish: true,
      nodeType: FINISH_NODE_PRESSED,
      isWall: currentNode.isWall ? false : currentNode.isWall,
    };
    newGrid[prevRow][prevCol] = newPrev;
    newGrid[currentRow][currentCol] = newCurrent;
  }
  return newGrid;
};