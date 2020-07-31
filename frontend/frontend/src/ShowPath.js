import React, { Component } from 'react'
import './ShowPath.css';
import ShowHeader from './Components/ShowHeader'
import Map from './Components/Map'
import Divider from './Components/Divider'


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
        return (
            <div>
                <ShowHeader />
                <div className="row" style={marginTopBottom}>
                    <div className="col-sm-2"></div>
                    <Map />
                    <div className="col-sm-2"></div>
                </div>
                <Divider name="Visualizer" />
            </div>
        );
    }
}

export default ShowPath