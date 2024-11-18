import React, { useState } from 'react';
import "./LatLngForm.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const centerAlign = {
    textAlign: 'center',
    marginTop: '10px'
};

function LatLngForm(props) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        startLatitude: '',
        startLongitude: '',
        targetLatitude: '',
        targetLongitude: '',
        algorithm: 'Dijkstra'
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/', {
                startLatitude: event.target.elements.startLatitude.value,
                startLongitude: event.target.elements.startLongitude.value,
                targetLatitude: event.target.elements.targetLatitude.value,
                targetLongitude: event.target.elements.targetLongitude.value,
                algorithm: event.target.elements.algorithm.value
            });

            navigate('/showpath', {
                state: {
                    shortestPath: response.data.COORDS,
                    algorithm: formData.algorithm,
                    centerLat: props.centerLat,
                    centerLng: props.centerLng
                }
            });
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="col-sm-2">
            <div>
                <form onSubmit={handleSubmit} className='color'>
                    <div className="form-group">
                        <label>
                            Start Latitude:
                            <input 
                                className="form-control"
                                name="startLatitude"
                                type="number"
                                value={props.startLat}
                                placeholder="latitude"
                                onChange={handleChange}
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
                            value={props.startLng}
                            onChange={handleChange}
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
                        value={props.targetLat}
                        onChange={handleChange}
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
                        value={props.targetLng}
                        onChange={handleChange}
                        required
                        />
                        </label>
                    </div>
                    
                    <div>
                        <label>
                            Choose Algorithm:
                            <select 
                                name="algorithm" 
                                value={formData.algorithm} 
                                onChange={handleChange}
                            >
                                <option value="Dijkstra">Dijkstra</option>
                                <option value="A-Star">A Star (A*)</option>
                                <option value="Breadth-First Search (BFS)">Breadth-First Search</option>
                                <option value="Greedy Best-First Search">Greedy Best-First Search</option>
                            </select>
                        </label>
                    </div>
                    <div style={centerAlign}>
                        <button className="btn btn-default" type="submit">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LatLngForm;
