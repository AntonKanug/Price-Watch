import React, {Component} from 'react';
import Search from './Search';
import Navbar from './Navbar';
import SimpleSnackbar from './Snackbar'
import './App.css';
import axios from 'axios';  
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();


class Homepage extends Component{
  constructor(props){
    super(props);
    this.data = null
  }

  state={
    textField: null,
    show: false,
    response: false
  }

  componentDidMount(){
    axios.get('https://pricewatch-antonk.herokuapp.com/products')
      .then((data) => {
        this.data = data.data
        this.data.sort(function(a, b){
          var aLen = a.priceList.length, bLen = b.priceList.length
          if (aLen>=2 && bLen>=2 && a.available){
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
    return(
      <div>
        <Navbar data={this.data}/>
        <div data-aos="fade-up" data-aos-offset="150" style={{flexWrap:'wrap', flexDirection: 'row', justifyContent: 'center', display:'flex', maxWidth:'1200px', marginRight:'auto', marginLeft:'auto', marginBottom:'40px'}} className='mainPage'>
          <div style={{marginTop:'20px', maxWidth:'550px'}}>
            <h1 className="mainTitle" style={{ marginLeft:'-10px'}}>Price</h1>
            <h1 className="mainTitle" style={{ marginLeft:'-10px', marginTop: '-50px'}}>Watch</h1>
            <h3 className="subTitle" style={{marginTop:'-40px', marginLeft:'10px'}}>Search and Track prices of your favourite products from <b>Amazon</b></h3>
          </div>
          <div style={{maxWidth:'500px'}}>
            <img src={'assets/homeImg.png'} className='mainImage' alt=""></img>
          </div>
        </div>
        <Search data={this.data}/>
        <SimpleSnackbar/>
      </div>
    )
  }
}

export default Homepage;