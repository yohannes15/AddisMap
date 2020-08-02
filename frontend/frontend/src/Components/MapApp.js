import React, { Component } from 'react';
import Header from "./Header";
import Towns from "./Towns";
import MapForm from "./MapForm";
import Divider from "./Divider";
import Instructions from "./Instructions";
import ShowPath from "../ShowPath"
import ShowHeader from "./ShowHeader"

const backgroundBlack = {
    backgroundColor: 'black'
}

export class MapApp extends Component {
    constructor(props){
        super(props)
        this.handleUpdate = this.handleUpdate.bind(this)
        this.state = {
            centerLat: '39.0431',
            centerLng: '-76.9850',

        }
    }

    handleUpdate = (lat, lng) => {

        this.setState(prev => ({
            centerLat: lat,
            centerLng: lng,
        }))
        
    }

    render() {
        console.log("mapApp", this.state.centerLat)
        console.log("mapApp", this.state.centerLng)
        return (
            <div style={backgroundBlack}>
                <Header name='Shortest Path Finder and Visualizer'/>
                <Towns handleUpdate={this.handleUpdate}/>
                <MapForm 
                centerLat={this.state.centerLat}
                centerLng={this.state.centerLng}
                />
                <Divider name="Instructions"/>
                <Instructions />
            </div>
        )
    }
}

export default MapApp
