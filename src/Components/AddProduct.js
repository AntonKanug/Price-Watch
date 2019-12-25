import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';

class AddProduct extends Component {
    state={
      addProduct: false,
      show: false,
    }
      render() {
          return (
            <div >
            <Dialog open={this.state.show} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Your Own Product</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    To add a product to watch enter the name of the product and your email down below. When the product's price change by 5% you will recieve an email.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Product Name"
                    type="product"
                    autoComplete="off"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    id="name"
                    label="Email"
                    type="email"
                    autoComplete="on"
                    fullWidth
                />
                </DialogContent>
                <DialogActions>
                <Button 
                    onClick = {() => this.setState({show:!this.state.show})}
                    style={{fontFamily:'avenir, sans-serif', fontWeight:'700', padding:'5px 10px 5px 10px'}}>
                         {/* <CloseIcon style={{color:"#ff410c", fontSize: 27, fontWeight: 900}}/> */}
                    Cancel
                </Button>
                <Button 
                // onClick={handleClose} 
                style={{fontFamily:'avenir, sans-serif', fontWeight:'700',backgroundColor:'#FEBD69', padding:'5px 20px 5px 20px'}}>
                    Submit
                    {/* <CheckIcon style={{ fontSize: 20, fontWeight: 900}}/> */}
                </Button>
                </DialogActions>
            </Dialog>

            <Button variant='contained' style={{marginTop:"0px", borderRadius:'100px', background:'#FEBD69', fontFamily:'Avenir, sans-serif', fontWeight:'900', textTransform:'none', fontSize:'20px', padding:'0px 25px 0px 25px', transition: '0.2s'}} 
        // onClick={this.handleEvent.bind(this)}
            onClick={() => this.setState({show:true})}>Add Product</Button>
            </div>
           );            
      }
  }

  export default AddProduct