import React, { Component, useEffect, useState } from "react";
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Results from './Results';
import SkeletonCard from './SkeletonCard';
AOS.init();

class Search extends Component {
  constructor(props){
    super(props);
    this.data = null
  }

  state={
    textField: null,
    show: false,
    response: false
  }

  //Filter from entered textField
  filter = (product) => {
    if (product.title) {
      var title = product.title.toLowerCase();
      if (!this.state.textField) return true
      else {
        var textFieldSearch = this.state.textField.toLowerCase();
        return title.indexOf(textFieldSearch)>-1
      }
    }
    else return false
  }

  componentDidMount(){
    axios.get('https://pricewatch-antonk.herokuapp.com/products')
      .then((data) => {
        this.data = data.data
        this.setState({
          response:true
        });
      })
      .catch((error) => {
        console.error(error)
      })
  }

    render() {
      var filteredData = this.data!=null? this.data.filter(this.filter):null
      if (filteredData!==0) this.setState.show = true
      var placeholder = "Search for over " + (this.data!=null? this.data.length: 0) + " Products"

        return (
          <div data-aos="fade-up" data-aos-offset="150">
            <div className="searchBar">
              <InputBase
                style={{paddingLeft: 10, flex: '1', fontFamily: 'avenir, Nunito Sans, sans-serif', fontSize: '23px'}}
                placeholder={placeholder}
                inputProps={{ 'aria-label': 'search google maps' }}
                onChange={(event)=>this.setState({textField:event.target.value})}
              />
              <Divider orientation="vertical" style={{height:'45px'}} />
              <IconButton type="submit" aria-label="search">
                <SearchIcon />
              </IconButton>
            </div>
            <div style={{ alignItems: 'center',   margin: 'auto'}}>
            {this.data!=null? 
              <Results products={filteredData}/>:
                <SkeletonCard/>}
            </div>
          </div>
         )            
    }
}

export default Search
