import React, {Component} from 'react';
import Search from './Search';
import Navbar from './Navbar';
import './App.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

class Homepage extends Component{
  state = {
    response:false
  }
  
  render() {
    return(
      <div>
        <Navbar/>
        <div  data-aos="fade-up" data-aos-offset="150" style={{flexWrap:'wrap', flexDirection: 'row', justifyContent: 'center', display:'flex', maxWidth:'1200px', marginRight:'auto', marginLeft:'auto', marginBottom:'40px'}} className='mainPage'>
          <div style={{marginTop:'20px', maxWidth:'550px'}}>
            <h1 className="mainTitle" style={{ marginLeft:'-10px'}}>Price</h1>
            <h1 className="mainTitle" style={{ marginLeft:'-10px', marginTop: '-50px'}}>Watch</h1>
            <h3 className="subTitle" style={{marginTop:'-40px', marginLeft:'10px'}}>Search and Track prices of your favourite items from <b>amazon.ca</b></h3>
          </div>
          <div style={{maxWidth:'500px'}}>
            <img src={'assets/homeImg.png'} className='mainImage' alt=""></img>
          </div>
        </div>
        <Search/>
      </div>
    )
  }
}

export default Homepage;