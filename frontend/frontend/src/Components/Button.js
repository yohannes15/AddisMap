import React, { Component } from 'react'
import "./Button.css"

const marginFont = {
    marginTop: '20px',
    fontSize: '22px'
}

class Button extends Component {

    render() {
        return (
            <button style={marginFont} className="Button">{this.props.name}</button>
        );
    }
}

export default Button
