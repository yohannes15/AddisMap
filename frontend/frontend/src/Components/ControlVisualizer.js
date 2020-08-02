import React, { Component } from 'react'
import './ControlVisualizer.css'

const marginBottom = {
    marginBottom : '15px'
}

const rightAlign = {
    textAlign: 'right'
}

const centerAlign = {
    textAlign: 'center'
}

const blueBackground = {
    backgroundColor: 'skyblue'

}

const whiteSmoke = {
    color: 'whitesmoke'
}

const displayNone = {
    display: 'none'
}

export class ControlVisualizer extends Component {
    render() {
        console.log(this.props.algorithm)
        return (
        <div>

            <h1 id="selected-algorithm" style={displayNone}>{this.props.algorithm}</h1>
            <div style={marginBottom} className="row">
                <div className="col-sm-4">
                    <button className="start-button" htmltype="submit" id="mazes" style={blueBackground}>Create A Random Maze</button>
                </div>
                <div style={rightAlign} className="col-sm-8">
                    <button className="start-button" htmltype="submit" id="startBtn" style={centerAlign}>Start</button>
                    <button className="start-button" htmltype="submit" id="clearBtn" style={centerAlign}>Clear Board</button>
                </div>
            </div>

            <div className="row">
                    <div className="col-sm-2">
                        <div className="key wall"></div>  
                        <div style={whiteSmoke}> Wall</div>
                    </div>
                    <div className="col-sm-2">
                        <div className="key start"></div>  
                        <div style={whiteSmoke}>Start</div>
                    </div>
                    <div className="col-sm-2">
                        <div className="key end"></div>  
                        <div style={whiteSmoke}>Target</div>
                    </div>
                    <div className="col-sm-2">
                        <div className="key visited"></div>  
                        <div style={whiteSmoke}>Visited</div>
                    </div>
                    <div className="col-sm-2">
                        <div className="key success"></div>  
                        <div style={whiteSmoke}>Shortest-Path</div>
                    </div>
                    <div className="col-sm-2">
                        <div className="key"></div>  
                        <div style={whiteSmoke}>Unvisited</div>
                    </div>
            </div>
        </div>
        )
    }
}

export default ControlVisualizer
