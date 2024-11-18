import React, { Component } from 'react';
import TownButton from "./TownButton";

const rightAlign = {
    textAlign: 'right'
}

const color = {
    color: 'white'
}



export class Towns extends Component {
    constructor(props){
        super(props)
        this.state = {
            silverCenterLat: '39.0431',
            silverCenterLng: '-76.9850',
            addisCenterLat: '8.993029',
            addisCenterLng: '38.805703'
        }
    }

    render() {
        // console.log(this.state.centerLat)
        // console.log(this.state.centerLat)

        return (
            <div className="container">
                <div className="row">
                    <div style={rightAlign} className="col-sm-6" >                    
                        
                            <TownButton
                            Lat= '39.0431'
                            Lng= '-76.9850'
                            handleTown = {this.props.handleUpdate}
                            name='Silver Spring Maryland USA'
                            />
                        
                     
                    </div>
                    <div className="col-sm-6" >
                        
                            {/* <div onClick = {() => this.props.handleUpdate('8.993029', '38.805703')}> */}
                            <TownButton 
                            Lat= '8.993029'
                            Lng= '38.805703'
                            handleTown = {this.props.handleUpdate}
                            name="Gerji Addis Ababa Ethiopia"
                            />
                            
                        
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default Towns