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
    render() {
        return (
            <div style={backgroundBlack}>
                <Header name='Shortest Path Finder and Visualizer'/>
                <Towns />
                <MapForm />
                <Divider name="Instructions"/>
                <Instructions />
            </div>
        )
    }
}

export default MapApp
