import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import AddProduct from './AddProduct';

class Navbar extends Component {
  state={
    addProduct: false
  }
    render() {
        return (
          <div>
          <AppBar position="fixed" style={{ background: "#131A22", maxHeight:"63px",}}>
            <Toolbar>
              <Typography variant="h6" style={{ fontSize:'25px',  fontFamily:'Avenir, sans-serif', fontWeight:'900'}}>Price Watch</Typography>
                <img src={'/assets/logo.png'}  alt='' style={{marginLeft:'10px',height:'36px',}}></img>
                <div style={{ flexGrow:'1'}}></div>
                {/* <p style={{ fontFamily:'Avenir, sans-serif', fontWeight:'900', fontSize:'19px', marginTop:'3px', marginRight:'-10px'}} className='text-AppBar'>Add Product</p> */}
              {/* <Add/> */}
            <AddProduct/>
            </Toolbar>
          </AppBar>
          </div>
         );            
    }
}

export default Navbar
