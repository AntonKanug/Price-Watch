import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import CircularProgress from '@material-ui/core/CircularProgress';
import Results from './Results';
import AOS from 'aos';
import 'aos/dist/aos.css';

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
        if (product.title != null) {
        var title = product.title.toLowerCase();
        if (!this.state.textField) return true
        else{
          var textFieldSearch = this.state.textField.toLowerCase();
          return title.indexOf(textFieldSearch)>-1
        }
      }
      else return false
    }

    componentDidMount(){
        fetch('https://antonkanug.github.io/Price-Watch-BE/data.json')
        .then(response => response.json())
        .then((data) => {
          this.data = data
          this.setState({
            response:true
          });
          console.log(this.data)
          // jsonData is parsed json object received from url
        })
        .catch((error) => {
          // handle your errors here
          console.error(error)
        })
    }
    render() {
        
      var filteredData = this.data!=null? this.data.filter(this.filter):null
      if (filteredData!==0) this.setState.show = true
      var placeholder = "Search for over " + (this.data!=null? this.data.length: 0) + " Products"
        return (
          <div>
            <div className="searchBar">
            {/* <IconButton aria-label="menu">
              <MenuIcon />
            </IconButton> */}
            <InputBase
              style={{paddingLeft: 10, flex: '1', fontFamily: 'avenir, sans-serif', fontSize: '23px'}}
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
          {this.data!=null? 
            <Results products={filteredData}/>:
            <div style={{textAlign: 'center', marginTop:'100px'}}>
              <CircularProgress style={{color:"#F77313"}} size={50}/>
            </div>}
          </div>
        </div>
         )            
    }
}

export default Search
