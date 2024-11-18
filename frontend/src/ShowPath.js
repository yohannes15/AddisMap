import React, { Component } from 'react'
import './ShowPath.css';
import ShowHeader from './Components/ShowHeader'
import Divider from './Components/Divider'
import Visualizer from './Components/Visualizer'
import PathMap from './Components/PathMap'
import DirMap from './Components/DirMap'



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
    constructor(props){
        super(props)
        this.state = {
            shortestPath : this.props.location.state.shortestPath
        }
    };

    // handleGoogleMapApi = (google) => {
    //     var flightPath = new google.maps.Polyline({
    //       path: [ { "lat": 53.480759, "lng": -2.242631 },{ "lat": 51.507351, "lng": -0.127758 },{ "lat": 55.953252, "lng": -3.188267 } ],
    //       geodesic: true,
    //       strokeColor: '#33BD4E',
    //       strokeOpacity: 1,
    //       strokeWeight: 5
    //     });
    //     flightPath.setMap(google.map)
        
    //     let directionsService = new google.maps.DirectionsService()
    //     var directionsDisplay = new google.maps.DirectionsRenderer()
    //     directionsDisplay.setMap(google.map)
        
    //     directionsService.route(
    //       {
    //         travelMode: 'DRIVING',
    //         origin: "austin, texas",
    //         destination: "houston, texas"
    //       },
    //       (DirectionsResult, DirectionsStatus) => {
    //         console.log('DirectionsResult', DirectionsResult)
    //         console.log('DirectionsStatus', DirectionsStatus)
    //         if (status == 'OK') {
    //           directionsDisplay.setDirections(DirectionsResult);
    //         }
    //       }
    //     )
    //   }


    render() {
        return (
            <div>
                <ShowHeader/>
                <div className="row" style={marginTopBottom}>
                    <div className="col-sm-2"></div>
                    <PathMap shortestPath = {this.state.shortestPath} centerLat={this.props.location.state.centerLat} centerLng={this.props.location.state.centerLng} zoom={16}/>
                    <div className="col-sm-2"></div>
                </div>
                <Divider name={`${this.props.location.state.algorithm} Visualizer`} />
                <Visualizer algorithm={this.props.location.state.algorithm}/>
                <Divider name={`${this.props.location.state.algorithm} Visualizer`} />
                <div className="row" style={marginTopBottom}>
                    <div className="col-sm-2"></div>
                    <DirMap 
                            startLat={this.state.shortestPath[0][0]} 
                            startLng = {this.state.shortestPath[0][1]}
                            targetLat = {this.state.shortestPath[this.state.shortestPath.length - 1][0]}
                            targetLng = {this.state.shortestPath[this.state.shortestPath.length - 1][1]}
                            centerLat={this.props.location.state.centerLat} 
                            centerLng={this.props.location.state.centerLng} 
                            zoom={16}
                            />  
                    <div className="col-sm-2"></div>
                </div>

            </div>
        );
    }
}

export default ShowPath