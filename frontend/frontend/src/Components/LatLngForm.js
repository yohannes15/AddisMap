import React, { Component } from 'react';
import "./LatLngForm.css";
import axios from 'axios'
import { withRouter} from 'react-router-dom'

const centerAlign = {
    textAlign: 'center',
    marginTop: '10px'
}

export class LatLngForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            startLatitude: '',
            startLongitude: '',
            targetLatitude: '',
            targetLongitude: '',
            algorithm: 'Dijkstra',
            shortestPathCoords: []
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleSubmit = (event, requestType) => {
        event.preventDefault()
        const startLatitude = event.target.elements.startLatitude.value
        const startLongitude = event.target.elements.startLongitude.value
        const targetLatitude = event.target.elements.targetLatitude.value
        const targetLongitude = event.target.elements.targetLongitude.value
        const algorithm = event.target.elements.algorithm.value

        // console.log(startLatitude,startLongitude, targetLatitude, targetLongitude, algorithm)

        if (requestType == 'post'){
            axios.post('http://127.0.0.1:8000/api/', {
                startLatitude: startLatitude,
                startLongitude: startLongitude,
                targetLatitude: targetLatitude,
                targetLongitude: targetLongitude,
                algorithm, algorithm
            })
            .then(res =>
            this.setState({
                shortestPathCoords: res.data.COORDS}
                ,()=> this.props.history.push({
                    state: {shortestPath: this.state.shortestPathCoords,
                    algorithm: this.state.algorithm, 
                    centerLat: this.props.centerLat,
                    centerLng: this.props.centerLng},
                    pathname: '/showpath'
                })))
            .catch(err => console.error(err))
       
        } 
    }  

    handleChange(event){
        const target = event.target
        const name = target.name

        this.setState({
            [name]: target.value
        })
    }

    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
    }


    render() {

        return (
        
        <div className="col-sm-2">
           <div>
            <form 
            onSubmitCapture={(event) => this.handleSubmit(
                event, this.props.requestType
            )} 
            className='color'
            >
               <div className="form-group">
                   <label>
                       Start Latitude:
                       <input 
                        className="form-control"
                        name="startLatitude"
                        type="number"
                        value={this.props.startLat}
                        placeholder="latitude"
                        onChange={this.handleChange}
                        required
                       />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Start Longitude:
                        <input 
                        className="form-control"
                        name="startLongitude"
                        type="number"
                        placeholder="latitude"
                        value={this.props.startLng}
                        onChange={this.handleChange}
                        required
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Target Latitude:
                        <input 
                        className="form-control"
                        name="targetLatitude"
                        type="number"
                        placeholder="longitude"
                        value={this.props.targetLat}
                        onChange={this.handleChange}
                        required
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Target Longitude:
                        <input 
                        className="form-control"
                        name="targetLongitude"
                        type="number"
                        placeholder="longitude"
                        value={this.props.targetLng}
                        onChange={this.handleChange}
                        required
                        />
                    </label>
                </div>
                
                <div>
                    <label>
                        Choose Algorithm:
                        <select name="algorithm" value={this.state.algorithm} onChange={this.handleChange}>
                            <option value="Dijkstra">Dijkstra</option>
                            <option value="A-Star">A Star (A*)</option>
                            <option value="Breadth-First Search (BFS)">Breadth-First Search</option>
                            <option value="Greedy Best-First Search">Greedy Best-First Search</option>
                        </select>
                    </label>
                </div>

                    <div style={centerAlign}>
                        <button className="btn btn-default" type="primary" htmltype="submit">
                            Submit
                        </button>
                    </div>
                </form>
           </div>
           </div>
        )
    }
}

export default withRouter(LatLngForm)

  {/* <div>
                <form method="POST" role="form" id="latlngform">
                     <div className="form-group">
                        <label htmlFor="start-latitude">Start Latitude</label>
                        <input step="any" className="form-control" name="start-latitude" id="start-latitude" placeholder="Latitude" />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="start-longitude">Start Longitude</label>
                        <input step="any" className="form-control" name="start-longitude" id="start-longitude" placeholder="Longitude" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="destination-latitude">Target Latitude</label>
                        <input step="any" className="form-control" name="destination-latitude" id="destination-latitude" placeholder="Latitude" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="destination-longitude">Target Longitude</label>
                        <input step="any" className="form-control" name="destination-longitude" id="destination-longitude" placeholder="Longitude" />
                    </div>
                    
                    <div>
                        <label htmlFor="algorithm">Choose Algorithm: </label>
                            <select id="algorithm" name="search-algo">
                                <option value="Dijkstra">Dijkstra</option>
                                <option value="A-Star">A Star (A*)</option>
                                <option value="Breadth-First Search (BFS)">Breadth-First Search</option>
                                <option value="Greedy Best-First Search">Greedy Best-First Search</option>
                            </select>
                    </div>
                    
                    <div style={centerAlign}>
                        <button type="submit" className="btn btn-default">Submit</button>
                    </div>
                </form>
  </div>*/}
