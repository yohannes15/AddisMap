import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
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



const StartMarker = props => {
    const { locations, ...markerProps } = props;
    return (
      <span>
        {locations.map((location, i) => {
          return (
            <Marker
              key={i}
              icon ={"http://maps.google.com/mapfiles/kml/paddle/S.png"}
              {...markerProps}
              position={{ lat: location.lat(), lng: location.lng() }}
            />
          );
        })}
      </span>
    );
  };


const DestinationMarker = props => {
    const { locations, ...markerProps } = props;
    return (
      <span>
        {locations.map((location, i) => {
          return (
            <Marker
              key={i}
              icon ={"https://img.icons8.com/doodle/48/000000/finish-flag.png"}
              {...markerProps}
              position={{ lat: location.lat(), lng: location.lng() }}
            />
          );
        })}
      </span>
    );
  };



export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          startLocations: [],
          endLocations: [],
          startLatitude : '',
          startLongitude : '',
          targetLatitude : '',
          targetLongitude : ''
        };
        this.handleMapClick = this.handleMapClick.bind(this);
      };

    handleMapClick = (ref, map, ev) => {

        const location = ev.latLng
        if (this.state.startLocations.length < 1){
            this.setState(prevState => ({
                startLocations: [...prevState.startLocations, location],
                startLatitude: location.lat(),
                startLongitude: location.lng(),
            }));
            this.props.handleStateUpdate(
              this.state.startLatitude,
              this.state.startLongitude,
              this.state.targetLatitude,
              this.state.targetLongitude
              )
            // this.setState
        }

        else if (this.state.startLocations.length > 0 && this.state.endLocations.length < 1){
            this.setState(prevState => ({
                endLocations: [...prevState.endLocations, location],
                targetLatitude: location.lat(),
                targetLongitude: location.lng(),
            }));
            this.props.handleStateUpdate(
              this.state.startLatitude,
              this.state.startLongitude,
              this.state.targetLatitude,
              this.state.targetLongitude
              )
        }

        else{
            this.state.startLocations = this.state.startLocations.slice(1)
            this.state.startLatitude = ''
            this.state.startLongitude = ''
            this.state.endLocations = [] 
            this.state.targetLatitude = ''   
            this.state.targetLongitude = ''        
            this.setState(prevState => ({
                startLocations: [...prevState.startLocations, location],
                startLatitude: location.lat(),
                startLongitude : location.lng(),
            }))
            this.props.handleStateUpdate(
              this.state.startLatitude,
              this.state.startLongitude,
              this.state.targetLatitude,
              this.state.targetLongitude
              )
        }
       
        map.panTo(location);
    };

    render() {

        return (
            <div style={rightAlign} className="col-sm-8">
                <div className="embed-responsive embed-responsive-16by9" style={marginBottom}>
                    <div className="embed-responsive-item">
                        
                    <Map
                        google={this.props.google}
                        className={"map"}
                        zoom={this.props.zoom}
                        initialCenter={this.props.center}
                        onClick={this.handleMapClick}
                        minZoom={16}
                        maxZoom={16}
                    >
                        <StartMarker locations={this.state.startLocations}
                        />
                        
                        <DestinationMarker locations={this.state.endLocations}
                        />
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
  })(MapContainer);



{/* <div style={rightAlign} className="col-sm-8">
    <div className="embed-responsive embed-responsive-16by9" style={marginBottom}>
        <div id="map_canvas" className="embed-responsive-item" className="Map"></div>
    </div>
</div>  */}
