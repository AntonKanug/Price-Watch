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
        this.data.sort(function(a, b){
          var aLen = a.priceList.length, bLen = b.priceList.length
          if (aLen>=2 && bLen>=2){
            var aPrice1 = a.priceList[aLen-1].price, bPrice1 = b.priceList[bLen-1].price
            var aPrice2 = a.priceList[aLen-2].price, bPrice2 = b.priceList[bLen-2].price
            var aChange = (aPrice1-aPrice2)*100/aPrice2, bChange = (bPrice1-bPrice2)*100/bPrice2
            return Math.abs(bChange) - Math.abs(aChange)
          }
          else return 1
        })
        this.setState({
          response:true
        });
      })
      .catch((error) => {
        console.error(error)
      })
  }

    render() {
      var filteredData = this.state.response? this.data.filter(this.filter):null
      if (filteredData!==0) this.setState.show = true
      var placeholder = this.state.response? "Search for over " + this.data.length + " Products": "Booting Up Backend, Please Wait"

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
            {this.state.response? 
              <Results products={filteredData}/>:
                <SkeletonCard/>}
            </div>
          </div>
         )            
    }
}

export default Search
