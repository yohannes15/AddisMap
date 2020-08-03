import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper, Polyline } from "google-maps-react";
import axios from 'axios'
import {Helmet} from "react-helmet";
import "./Map.css";
import { Icon } from '@iconify/react'
import PropTypes from 'prop-types'


const rightAlign = {
    textAlign: 'right'
}

const marginBottom = {
    marginBottom: '15px'
}


export class PathMap extends Component {
    constructor(props) {
        super(props);
        this.fetchDirections = this.fetchDirections.bind(this)
      };

    fetchDirections(mapProps, map) {
        const {google} = mapProps;
        var directionsService = new google.maps.DirectionsService()
        var directionsDisplay = new google.maps.DirectionsRenderer()
        var start = new google.maps.LatLng({lat: this.props.startLat, lng: this.props.startLng})
        var target = new google.maps.LatLng({lat: this.props.targetLat, lng: this.props.targetLng})

        directionsDisplay.setMap(map)

        var request = {
            origin: start,
            destination: target,
            travelMode: 'DRIVING'
        }

        console.log(request)

        directionsService.route(request, function(result, status){
            if (status == 'OK'){
                directionsDisplay.setDirections(result)
            }
        });

    // ...
    }



    render() {
        return (
            <div style={rightAlign} className="col-sm-8">
                <div className="embed-responsive embed-responsive-16by9" style={marginBottom}>
                    <div className="embed-responsive-item">
                        
                    <Map
                        key={new Date().getTime()}
                        google={this.props.google}
                        className={"map"}
                        zoom={this.props.zoom}
                        initialCenter={{lat: this.props.centerLat, lng: this.props.centerLng}}
                        minZoom={16}
                        maxZoom={16}
                        onReady={this.fetchDirections}
                        >
                        
                    </Map>
                    </div>
                </div>
            </div> 
        )
    }
    
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyAv0SjrNE-LMf6LncO5Lx40XP1VlGVCS6Q",
    libraries: []
  })(PathMap);



{/* <div style={rightAlign} className="col-sm-8">
    <div className="embed-responsive embed-responsive-16by9" style={marginBottom}>
        <div id="map_canvas" className="embed-responsive-item" className="Map"></div>
    </div>
</div>  */}
