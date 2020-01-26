import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AddProduct from './AddProduct';
import ViewProduct from './ViewProduct';

class Navbar extends Component {
  render() {
      return (
        <AppBar position="fixed" style={{ background: "#131A22", maxHeight:"63px",}}>
          <Toolbar>
            <h6 style={{ fontSize:'25px',  fontFamily:'Avenir, Nunito Sans, sans-serif', fontWeight:'900'}}>Price Watch</h6>
            <img src={'/assets/logo.png'}  alt='' style={{marginLeft:'10px',height:'36px',}}></img>
            <div style={{ flexGrow:'1'}}></div>
            <p style={{ fontFamily:'Avenir, sans-serif', fontWeight:'900', fontSize:'19px', marginTop:'20px', marginRight:'10px'}} className='text-Navbar'>Want to watch a Product?</p>
            <AddProduct/>
            <ViewProduct data={this.props.data}/>
          </Toolbar>
        </AppBar>
        );            
    }
}

export default Navbar
