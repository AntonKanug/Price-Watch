import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import data from './data.json';
import Results from './Results';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();
class Search extends Component {
  state={
    textField: null,
    show: false
  }
      //Filter from entered textField
      filter = (product) => {
        if (product.title != null) {
        var title = product.title.toLowerCase();
        if (this.state.textField === null) return true
        else{
          var textFieldSearch = this.state.textField.toLowerCase();
          return title.indexOf(textFieldSearch)>-1
        }
      }
      else return false
    }

    render() {
      var filteredData = data.filter(this.filter)
      if (filteredData!==0) this.setState.show = true
      var placeholder = "Search for over " + data.length + " Products"
        return (
          <div data-aos="fade-up" data-aos-offset="150">
            <div className="searchBar">
            {/* <IconButton aria-label="menu">
              <MenuIcon />
            </IconButton> */}
            <InputBase
              style={{paddingLeft: 10, flex: '1', fontFamily: 'avenir', fontSize: '23px'}}
              placeholder={placeholder}
              inputProps={{ 'aria-label': 'search google maps' }}
              onChange={(event)=>this.setState({textField:event.target.value})}
            />
              <div>
            </div>
            {/* {console.log(this.state.textField)}
            {console.log(data)} */}
            <Divider orientation="vertical" style={{height:'45px'}} />
            <IconButton type="submit" aria-label="search">
              <SearchIcon />
            </IconButton>
          </div>
          <div style={{ alignItems: 'center',   margin: 'auto'}}>
          <Results products={filteredData}/>
          </div>
        </div>
         );            
    }
}

export default Search
