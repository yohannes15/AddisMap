import React, { Component } from 'react'
import "./Header.css"

const bgColor = {
    backgroundColor: 'rebeccapurple'
}

export class Divider extends Component {
    render() {
        return (
        <div style={bgColor} className="Header">{this.props.name}</div>
        )
    }
}

export default Divider


