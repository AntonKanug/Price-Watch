import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';

// import Add from './Add';

class Navbar extends Component {
  state={
    addProduct: false
  }
    render() {
        return (
          <AppBar position="fixed" style={{ background: "#131A22", maxHeight:"63px",}}>
            <Toolbar>
              <Typography variant="h6" style={{ fontSize:'25px',  fontFamily:'Avenir, sans-serif', fontWeight:'900'}}>Price Watch</Typography>
                <img src={'/assets/logo.png'}  alt='' style={{marginLeft:'10px',height:'36px',}}></img>
                <div style={{ flexGrow:'1'}}></div>
                {/* <p style={{ fontFamily:'Avenir, sans-serif', fontWeight:'900', fontSize:'19px', marginTop:'3px', marginRight:'-10px'}} className='text-AppBar'>Add Product</p> */}
              {/* <Add/> */}
              <Button variant='contained' style={{marginTop:"0px", borderRadius:'100px', background:'#FEBD69', fontFamily:"Avenir", fontWeight:'900', textTransform:'none', fontSize:'20px', padding:'0px 25px 0px 25px', transition: '0.2s'}} 
        // onClick={this.handleEvent.bind(this)}
        onClick={() => this.setState({addProduct:!this.state.addProduct})}>Add Product</Button>
            </Toolbar>

            <Snackbar
            style={{fontFamily:'Avenir, sans-serif', fontWeight:'900', color:'#FEBD69'}}
            bodyStyle={{ backgroundColor: 'teal', color: 'coral' }}
            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
            variant="success"
            autoHideDuration={6000}
            message={"\"Add Product\" is Under Development!"}
            open={this.state.addProduct}
            action={ <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              onClick={() => this.setState({addProduct:false})}
            ><CloseIcon />
            </IconButton>}
          />
          </AppBar>
         );            
    }
}

export default Navbar
