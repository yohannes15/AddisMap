import React, { Component } from 'react'
import './ShowHeader.css'
import Button from './Button'

const alignCenter = {
    alignContent: 'center'
}

export class ShowHeader extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-4">
                        <form>
                            <Button name='Back To Map'/>
                        </form>
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
