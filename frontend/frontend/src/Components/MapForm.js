import React, { Component } from 'react';
import LatLngForm from "./LatLngForm";
import Map from "./Map";

const marginTop = {
    marginTop: "20px"
}

const location = {
    address: 'Center',
    lat: 39.0431,
    lng: -76.9850,
}


export class MapForm extends Component {
    constructor(props){
        super(props)
        this.handleStateUpdate = this.handleStateUpdate.bind(this)
        this.state = {
            startLatitude : '',
            startLongitude : '',
            targetLatitude : '',
            targetLongitude : ''
        }
    }

    handleStateUpdate = (startLat, startLng, targetLat, targetLng) => {
        this.setState(prev => ({
            startLatitude : startLat,
            startLongitude : startLng,
            targetLatitude : targetLat,
            targetLongitude : targetLng
        }))

    }

    render() {
        return (
            <div className="row" style={marginTop}>
                <LatLngForm 
                startLat={this.state.startLatitude} 
                startLng={this.state.startLongitude}
                targetLat={this.state.targetLatitude}
                targetLng={this.state.targetLongitude}
                handleStateUpdate={this.state.handleStateUpdate}
                />
                <Map center={{ lat:39.0431, lng: -76.9850}} zoom={16} handleStateUpdate={this.handleStateUpdate} />
            </div>
        )
    }
}

export default MapForm
