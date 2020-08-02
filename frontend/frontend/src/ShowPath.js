import React, { Component } from 'react'
import './ShowPath.css';
import ShowHeader from './Components/ShowHeader'
import Map from './Components/Map'
import Divider from './Components/Divider'
import Visualizer from './Components/Visualizer'


const marginTopBottom = {
    marginTop: '30px',
    marginBottom: '30px'
}

const marginTop = {
    marginTop: '20px'
}

const whiteColor = {
    color: 'white'
}


export class ShowPath extends Component {
    render() {
        console.log(this.props.location.state.shortestPath, this.props.location.state.algorithm)
        
        return (
            <div>
                <ShowHeader/>
                <div className="row" style={marginTopBottom}>
                    <div className="col-sm-2"></div>
                    <Map />
                    <div className="col-sm-2"></div>
                </div>
                <Divider name={`${this.props.location.state.algorithm} Visualizer`} />
                <Visualizer algorithm={this.props.location.state.algorithm}/>
                
            </div>
        );
    }
}

export default ShowPath