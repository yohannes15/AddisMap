import React, { Component } from 'react'
import "./Instructions.css"

export class Instructions extends Component {
    render() {
        return (
            <div className="row">
            <div className="col-sm-2"></div>
            <div className="col-sm-8">
                <ol className="Instructions">
                    <li><p>Click on the map to set the start and end destination. The start is symboled with a (S) on the map, while the destination is symboled with a flag. The form on the left hand side will automatically fill when selecting the start and destination markers</p></li>
                    <li><p>Select your chosen path finding algorithm from the dropdown </p></li>
                    <li><p>Click Submit and you will be redirected to a page which shows: </p></li>
                        <ul className="Instructions-bullet">
                            <li> A) Shortest Path Calcuated Using the Algorithm</li>
                            <li> B) Visualizer for The algorithm</li>
                            <li> C) Comaparison of Path To Google Directions API Path</li>
                        </ul>

                    
                </ol>

            </div>
            <div className="col-sm-2"></div>
        </div>
        )
    }
}

export default Instructions
