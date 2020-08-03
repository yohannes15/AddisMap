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
        this.state = {
            path : [],
            startLat: '',
            startLng: '',
            targetLat: '',
            targetLng: ''
        }
      };
    
    componentDidMount(){
        var path = this.props.shortestPath.map(function(x) { 
            return { 
              lat: x[0], 
              lng: x[1] 
            }; 
          });

          console.log(this.props.shortestPath[0][0])

          this.setState({
              path: path,
              startLat: this.props.shortestPath[0][0],
              startLng: this.props.shortestPath[0][1],
              targetLat: this.props.shortestPath[this.props.shortestPath.length - 1][0],
              targetLng: this.props.shortestPath[this.props.shortestPath.length - 1][1]
          })
        
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
                        maxZoom={16}>
                        <Marker 
                        position={{lat: this.state.startLat, lng: this.state.startLng}}
                        icon ={"http://maps.google.com/mapfiles/kml/paddle/S.png"}
                        />
                        <Marker 
                        icon ={"https://img.icons8.com/doodle/48/000000/finish-flag.png"}
                        position={{lat: this.state.targetLat, lng: this.state.targetLng}}
                        />
                        <Polyline 
                            path = {this.state.path}
                            // options={{ 
                            //     strokeColor: '#00ffff',
                            //     strokeOpacity: 1,
                            //     strokeWeight: 2,
                            //     icons: [{ 
                            //       icon: "hello",
                            //       offset: '0',
                            //       repeat: '10px'
                            //     }],
                            //   }}

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
  })(PathMap);



{/* <div style={rightAlign} className="col-sm-8">
    <div className="embed-responsive embed-responsive-16by9" style={marginBottom}>
        <div id="map_canvas" className="embed-responsive-item" className="Map"></div>
    </div>
</div>  */}
