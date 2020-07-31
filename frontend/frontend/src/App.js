import React, {Component} from 'react';
import MapApp from './Components/MapApp'
import ShowPath from "./ShowPath"
import initalize from "./map"

import {withRouter} from "react-router";
import axios from 'axios'
import {Helmet} from "react-helmet";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import './App.css';

const location = {
  address: 'Center',
  lat: 39.0431,
  lng: -76.9850,
}

class App extends Component {

state = {
    GMAPS_KEY: '',
    // URL: ''
};




componentDidMount(){
    axios.get('http://127.0.0.1:8000/api/')
        .then(res => {
            this.setState({
                GMAPS_KEY: res.data,
                // URL: `http://maps.googleapis.com/maps/api/js?key=${res.data.GMAPS_API_KEY}&sensor=false`

            })           
        });
    
  }


  render(){
    return (
    <div>
      {/* <Helmet>
            <script type="text/javascript" src={this.state.URL} ></script>
        </Helmet> */}
      <Router >
          <div className='App'>
            <Route exact path='/showpath/' component={withRouter(ShowPath)} />
            <Route exact path='/' component={withRouter(MapApp)} />
            
          </div>
      </Router>
    </div>
    )
  }
}

export default App;