import React, { Component } from 'react'
import $ from 'jquery'
import update from 'immutability-helper'
import ReactDOM from 'react-dom'
import Board from './Board/Board'


export class Visualizer extends Component {

    render() {
        return (

            <div className="container">
                
            <div className="container">
                <div className="d-flex flex-column align-items-center">
                    
                            <Board />
                        </div>
                    </div>
             </div>
            
        )
    }
}

export default Visualizer
