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
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';


const StyledBar = withStyles({
root: {
    background: 'white',
    color: '#00695c'
},
bar: {
    borderRadius:10,
    backgroundColor: '#F77313',
    }
})(LinearProgress);

const StyledTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: '#FEBD69',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#FEBD69',
      }
    }
})(TextField);
class AddProduct extends Component {
    state={
      snackSuccess: false,
      snackError: false,
      emailValid: true,
      emptyEmail: false,
      emptyProduct: false,
      show: false,
      progress: false,
      error: false,
      product: '',
      email: ''
    }

    submit (){
        var emptyEmail = this.state.email == ""
        var emptyProduct = this.state.product == ""
        this.setState({
            emptyProduct: emptyProduct,
            emptyEmail: emptyEmail
            })
        if (IsEmail.validate(this.state.email, {errorLevel: true}) >0)
            this.setState({
                emailValid: false
                })
        else if (!emptyProduct && !emptyEmail) {
            this.setState({
                show: false,
                progress: true,
                })
            axios.post('https://pricewatch-antonk.herokuapp.com/addProduct',{
                title: this.state.product,
                email: this.state.email
            })
            .then(res => {
                this.setState({
                    product: '',
                    email: '',
                    snackSuccess: true,
                    progress: false,
                    })
                })
                .catch(err => {
                    this.setState({
                        error: true,
                        show: false,
                        snackError: true,
                        progress: false
                    })
                })
            }
        }
            

      render() {
        if (this.state.show) document.title = "Price Watch | Add Product";
        else document.title = "Price Watch"
          return (
            <div >
            <Dialog open={this.state.show} aria-labelledby="form-dialog-title">
                <DialogTitle disableTypography='true'id="form-dialog-title" style={{fontFamily:'Avenir, sans-serif', fontWeight:900, fontSize:'27px', lineHeight:1.2, paddingBottom:'3px'}}>Add Your Own Product</DialogTitle>
                <DialogContent>
                    <DialogContentText disableTypography='true' style={{fontFamily:'Avenir, sans-serif', fontWeight:500, fontSize:'18px', lineHeight:1.25}}>
                        To add a product to watch enter the name of the product and your email down below. When the product's price changes by 5% you will receive an email.
                    </DialogContentText>
                    <StyledTextField
                        autoFocus
                        error={this.state.emptyProduct}
                        helperText={this.state.emptyProduct?"Enter Product":""}
                        margin="dense"
                        id="item"
                        label="Product Name"
                        type="product"
                        autoComplete="off"
                        fullWidth
                        InputLabelProps={{ style: {color: 'black', fontFamily:'Avenir, sans-serif', fontWeight:500, borderColor: 'red'} }} 
                        InputProps={{ style: {fontFamily:'Avenir, sans-serif', fontWeight:700} }} 
                        onChange = {(event) => this.setState({product:event.target.value})}
                    />
                    <StyledTextField
                        error={this.state.emptyEmail || !this.state.emailValid}
                        helperText={this.state.emptyEmail?"Enter Email":!this.state.emailValid?"Invalid Email":""}
                        margin="dense"
                        id="email"
                        label="Email"
                        type="email"
                        autoComplete="on"
                        fullWidth
                        InputLabelProps={{ style: {color: 'black', fontFamily:'Avenir, sans-serif', fontWeight:500} }} 
                        InputProps={{ style: {fontFamily:'Avenir, sans-serif', fontWeight:700} }} 
                        onChange = {(event) => this.setState({email:event.target.value})}
                    />
                </DialogContent>
                <DialogActions>
                    <Button 
                        style={{fontFamily:'avenir, sans-serif', fontWeight:'700', padding:'5px 10px 5px 10px'}}
                        onClick = {() => this.setState({show:!this.state.show})}>
                        Cancel
                    </Button>
                    <Button 
                        style={{fontFamily:'avenir, sans-serif', fontWeight:'700',backgroundColor:'#FEBD69', padding:'5px 20px 5px 20px', width:'100px'}}
                        onClick={this.submit.bind(this)}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
            <Button variant='contained' style={{marginTop:"0px", borderRadius:'100px', background:'#FEBD69', fontFamily:'Avenir, sans-serif', fontWeight:'900', textTransform:'none', fontSize:'20px', padding:'0px 25px 0px 25px', transition: '0.2s'}} 
            onClick={() => this.setState({show:true, added: false, error: false, emailValid: true})}>Add Product</Button>
            <Snackbar
                style={{fontFamily:'Avenir, sans-serif', fontWeight:'900'}}
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                variant="error"
                autoHideDuration={6000}
                open={this.state.progress}
                >
                {/* <CheckCircleIcon/> */}
                <SnackbarContent style={{backgroundColor:'white',fontFamily:'Avenir, sans-serif', fontWeight:'900', fontSize: 16}}
                message={<div ><h4 style={{display:'inline', color:'black'}}>Request Sent, Please Wait</h4><StyledBar variant="query"/></div>}
                action={ <IconButton
                    key="close"
                    aria-label="close"
                    onClick={() => this.setState({progress:false})}
                    ><CloseIcon style={{color:'black'}}/>
                    </IconButton>}
                />       
            </Snackbar>

            <Snackbar
                style={{fontFamily:'Avenir, sans-serif', fontWeight:'900'}}
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                variant="error"
                autoHideDuration={6000}
                open={this.state.snackSuccess}
                >
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