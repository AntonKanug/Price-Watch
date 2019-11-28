import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Homepage from './Components/Homepage.js';

class App extends Component{
  render() {
    return(
      <BrowserRouter>
        {/* <Route exact path='/' component={Homepage}/> */}
      </BrowserRouter>
    )
  }
}

export default App;