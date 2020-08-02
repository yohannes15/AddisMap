import React, { Component } from 'react';
import LatLngForm from "./LatLngForm";
import Map from "./Map";

const marginTop = {
    marginTop: "20px"
}

export class MapForm extends Component {
    constructor(props){
        super(props)
        this.handleStateUpdate = this.handleStateUpdate.bind(this)
        this.state = {
            startLatitude : '',
            startLongitude : '',
            targetLatitude : '',
            targetLongitude : '',

        }
    }


    handleStateUpdate = (startLat, startLng, targetLat, targetLng) => {
        this.setState(prev => ({
            startLatitude : startLat,
            startLongitude : startLng,
            targetLatitude : targetLat,
            targetLongitude : targetLng,
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
                requestType="post"
                />
                <Map handleStateUpdate={this.handleStateUpdate} centerLat= {this.props.centerLat}  centerLng={this.props.centerLng} zoom={16} />
            </div>
        )
    }
}

export default MapForm
