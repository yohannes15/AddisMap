import React, { Component } from 'react'
import "./Header.css"

const margin = {
    marginTop: '10px'
}

export class Header extends Component {
    render() {
        return (
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-2"></div>
                        <div style={margin} className="col-sm-8">
                            <div className="Header">{this.props.name}</div>  
                        </div>
                        <div className="col-sm-2">
                        </div>
                    </div>
                </div>
        )
    }
}

export default Header
