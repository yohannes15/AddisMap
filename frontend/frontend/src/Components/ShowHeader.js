import React, { Component } from 'react'
import './ShowHeader.css'
import TownButton from './TownButton'
import {Link} from 'react-router-dom'

const alignCenter = {
    alignContent: 'center'
}

const marginTop=  {
    marginTop: '25px'
}

export class ShowHeader extends Component {
    
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-4">
                        <div style={marginTop}>
                        <Link to='/' className='Button'>Go Back To Map</Link>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <h1 style={alignCenter} className="Header">Shortest Path Found!</h1>
                    </div>
                    <div className="col-sm-4"></div>
                </div>
            </div>
        )
    }
}

export default ShowHeader
