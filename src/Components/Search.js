import React, { Component } from "react";
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Results from './Results';
import SkeletonCard from './SkeletonCard';
AOS.init();

class Search extends Component {
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

    render() {
      var data = this.props.data  
      var filteredData = data!=null? data.filter(this.filter):null
      if (filteredData!==0) this.setState.show = true
      var placeholder = data!=null? "Search for over " + data.length + " Products": "Unidling Backend, Please Wait"

        return (
          <div data-aos="fade-up" data-aos-offset="150">
            <div className="searchBar">
              <InputBase
                style={{paddingLeft: 10, flex: '1', fontFamily: 'avenir, Nunito Sans, sans-serif', fontSize: '23px'}}
                placeholder={placeholder}
                inputProps={{ 'aria-label': 'search google maps' }}
                onChange={(event)=>this.setState({textField:event.target.value})}
              />
              <Divider orientation="vertical" style={{height:'45px', marginRight:'5px'}} />
              <IconButton type="submit" aria-label="search">
                <SearchIcon />
              </IconButton>
            </div>
            <div style={{ alignItems: 'center',   margin: 'auto'}}>
            {data!=null? 
              <Results products={filteredData}/>:
                <SkeletonCard/>}
            </div>
          </div>
         )            
    }
}

export default Search
