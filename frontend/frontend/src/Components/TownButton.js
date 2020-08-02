import React, { Component } from 'react'
import "./TownButton.css"

const marginFont = {
    marginTop: '20px',
    fontSize: '22px'
}

class TownButton extends Component {
    constructor(props){
        super(props)
        this.handleTown = this.handleTown.bind(this)
    }

    handleTown(lat, lng){
        this.props.handleTown(lat, lng)
    }

    render() {
        return (
            <button 
            style={marginFont} 
            className="Button"
            onClick={() => this.handleTown(this.props.Lat, this.props.Lng )}
            >
            {this.props.name}
            </button>
        );
    }
}

export default TownButton
