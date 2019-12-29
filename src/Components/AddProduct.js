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
import axios from 'axios';
import IsEmail from 'isemail';
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Typography from '@material-ui/core/Typography';

class AddProduct extends Component {
    state={
      snackSuccess: false,
      snackError: false,
      emailValid: true,
      emptyEmail: false,
      emptyProduct: false,
      show: false,
      added: false,
      error: false,
      product: '',
      email: ''
    }

    submit (){
        this.setState({
            emptyProduct: this.state.product == "",
            emptyEmail: this.state.email == ""
            })
        if (IsEmail.validate(this.state.email, {errorLevel: true}) >0)
            this.setState({
                emailValid: false
                })
        else {
            axios.post('https://pricewatch-antonk.herokuapp.com/addProduct',{
                title: this.state.product,
                email: this.state.email
            })
            .then(res => {
                this.setState({
                    product: '',
                    email: '',
                    show: false,
                    added: true,
                    snackSuccess: true,
                    })
                })
                .catch(err => {
                    this.setState({
                        error: true,
                        show: false,
                        snackError: true,
                    })
                })
            }
        }
            

      render() {
          return (
            <div >
            <Dialog open={this.state.show} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Your Own Product</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    To add a product to watch enter the name of the product and your email down below. When the product's price changes by 5% you will receive an email.
                </DialogContentText>
                <TextField
                    autoFocus
                    error={this.state.emptyProduct}
                    helperText={this.state.emptyProduct?"Enter Product":""}
                    margin="dense"
                    id="name"
                    label="Product Name"
                    type="product"
                    autoComplete="off"
                    fullWidth
                    onChange = {(event) => this.setState({product:event.target.value})}
                />
                <TextField
                    error={this.state.emptyEmail || !this.state.emailValid}
                    helperText={this.state.emptyEmail?"Enter Email":!this.state.emailValid?"Invalid Email":""}
                    margin="dense"
                    id="name"
                    label="Email"
                    type="email"
                    autoComplete="on"
                    fullWidth
                    onChange = {(event) => this.setState({email:event.target.value})}
                />
                </DialogContent>
                <DialogActions>
                <Button 
                    style={{fontFamily:'avenir, sans-serif', fontWeight:'700', padding:'5px 10px 5px 10px'}}
                    onClick = {() => this.setState({show:!this.state.show})}>
                    {/* <CloseIcon style={{color:"#ff410c", fontSize: 27, fontWeight: 900}}/> */}
                    Cancel
                </Button>
                <Button 
                // onClick={handleClose} 
                    style={{fontFamily:'avenir, sans-serif', fontWeight:'700',backgroundColor:'#FEBD69', padding:'5px 20px 5px 20px'}}
                    onClick={this.submit.bind(this)}>
                    Submit
                    {/* <CheckIcon style={{ fontSize: 20, fontWeight: 900}}/> */}
                </Button>
                </DialogActions>
            </Dialog>

            <Button variant='contained' style={{marginTop:"0px", borderRadius:'100px', background:'#FEBD69', fontFamily:'Avenir, sans-serif', fontWeight:'900', textTransform:'none', fontSize:'20px', padding:'0px 25px 0px 25px', transition: '0.2s'}} 
        // onClick={this.handleEvent.bind(this)}
            onClick={() => this.setState({show:true, added: false, error: false, emailValid: true})}>Add Product</Button>




        <Snackbar
            style={{fontFamily:'Avenir, sans-serif', fontWeight:'900'}}
            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
            variant="error"
            autoHideDuration={6000}
            open={this.state.snackSuccess}
            >
            {/* <CheckCircleIcon/> */}
            <SnackbarContent style={{backgroundColor:'rgb(80, 209, 0)',fontFamily:'Avenir, sans-serif', fontWeight:'900', fontSize: 16}}
            message="Success, Product was added"
            action={ <IconButton
                key="close"
                aria-label="close"
                onClick={() => this.setState({snackSuccess:false})}
                ><CloseIcon style={{color:'white'}}/>
                </IconButton>}
            />
            </Snackbar>

            <Snackbar
            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
            variant="error"
            autoHideDuration={6000}
            open={this.state.snackError}
            >
            {/* <ErrorIcon/> */}
            <SnackbarContent style={{backgroundColor:'red',fontFamily:'Avenir, sans-serif', fontWeight:'900', fontSize: 16}}

            message={"Error, Product was not added"}
            action={ <IconButton
                key="close"
                aria-label="close"
                onClick={() => this.setState({snackError:false})}
                ><CloseIcon style={{color:'white'}}/>
                </IconButton>}
            />
            </Snackbar>

            </div>

           );            
      }
  }

  export default AddProduct