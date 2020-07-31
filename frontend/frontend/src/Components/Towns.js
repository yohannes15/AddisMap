import React, { Component } from 'react';
import Button from "./Button";

const rightAlign = {
    textAlign: 'right'
}

const color = {
    color: 'white'
}

export class Towns extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    
                    <div style={rightAlign} className="col-sm-6">                    
                        <form>
                            <Button name='Silver Spring Maryland USA'/>
                        </form>
                     
                    </div>
                    <div className="col-sm-6">
                        <form>
                            <Button name="Gerji Addis Ababa Ethiopia"/>
                        </form>
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default Towns