import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import IsEmail from 'isemail';
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import ShowProduct from './ShowProducts'

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
class ViewProduct extends Component {

    constructor(props){
        super(props);
        this.data = []
      }
    
      state={
        textField: null,
        show: false,
        response: false,
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
    
      //Filter from entered textField
      filter = (email) => {
          return email.emailList[0]!=""? email.emailList.includes(this.state.email.toLowerCase()) : 0
      }
    
      componentDidMount(){
        axios.get('https://pricewatch-antonk.herokuapp.com/products')
          .then((data) => {
            this.data = data.data
            this.setState({
              response:true
            });
          })
          .catch((error) => {
            console.error(error)
          })
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
        var filteredData = this.state.response? this.data.filter(this.filter):null
        if (this.state.show) document.title = "Price Watch | View Products";
        else document.title = "Price Watch"
          return (
            <div >
            <Dialog open={this.state.show} aria-labelledby="form-dialog-title">
                <DialogTitle disableTypography='true'id="form-dialog-title" style={{fontFamily:'Avenir, Nunito Sans, sans-serif', fontWeight:900, fontSize:'27px', lineHeight:1.2, paddingBottom:'3px'}}>View Your Products</DialogTitle>
                <div style={{padding:"8px 24px 8px 24px"}}>
                    <DialogContentText disableTypography='true' style={{fontFamily:'Avenir, Nunito Sans, sans-serif', fontWeight:500, fontSize:'18px', lineHeight:1.25}}>
                       Enter your E-mail down below to see the products you added and manage the products.
                    </DialogContentText>
                    <StyledTextField
                        autoFocus
                        error={this.state.emptyProduct}
                        helperText={this.state.emptyProduct?"Enter Product URL or Name":""}
                        margin="dense"
                        id="email"
                        label="Email"
                        type="email"
                        autoComplete="on"
                        fullWidth
                        InputLabelProps={{ style: {color: 'black', fontFamily:'Avenir, Nunito Sans, sans-serif', fontWeight:500, borderColor: 'red'} }} 
                        InputProps={{ style: {fontFamily:'Avenir, Nunito Sans, sans-serif', fontWeight:700} }} 
                        onChange = {(event) => this.setState({email:event.target.value})}
                    />
                </div>
                <DialogActions>
                    <Button 
                        style={{fontFamily:'avenir, Nunito Sans, sans-serif', fontWeight:'700', padding:'5px 10px 5px 10px'}}
                        onClick = {() => this.setState({show:!this.state.show})}>
                        Cancel
                    </Button>
                </DialogActions>
            
                {filteredData != null? filteredData.map((product,index) => (<ShowProduct products={product} email={this.state.email}/> )) :
                    <div style={{width:'100%', marginTop:'40px', marginBottom:'40px', justifyContent:'center', justifyItems: 'center'}}>
                    <img src={'assets/notFoundImg.png'} style={{maxWidth:'450px',textAlign:'center'}} alt="" className="center"/>
                    <h2 style={{textAlign:'center',fontFamily:'avenir, Nunito Sans, sans-serif',fontWeight:'900', marginTop:'10px', fontSize:'35px'}}>View Your Products</h2>
                </div>   
            }
                {/* // <ShowProduct products={filteredData}/> */}
            </Dialog>
            
            <Button disabled={!this.state.response} variant='contained' style={{marginTop:"0px", marginLeft:'10px',borderRadius:'100px', background:'#FEBD69', fontFamily:'Avenir, Nunito Sans, sans-serif', fontWeight:'900', textTransform:'none', fontSize:'20px', padding:'0px 25px 0px 25px'}} 
            onClick={() => this.setState({show:true, added: false, error: false, emailValid: true, product:''})}>View Products</Button>
            <Snackbar
                style={{fontFamily:'Avenir, Nunito Sans, sans-serif', fontWeight:'900'}}
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                variant="error"
                autoHideDuration={6000}
                open={this.state.progress}
                >
                {/* <CheckCircleIcon/> */}
                <SnackbarContent style={{backgroundColor:'white',fontFamily:'Avenir, Nunito Sans, sans-serif', fontWeight:'900', fontSize: 16}}
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
                style={{fontFamily:'Avenir, Nunito Sans, sans-serif', fontWeight:'900'}}
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                variant="error"
                autoHideDuration={6000}
                open={this.state.snackSuccess}
                >
                <SnackbarContent style={{backgroundColor:'rgb(80, 209, 0)',fontFamily:'Avenir, Nunito Sans, sans-serif', fontWeight:'900', fontSize: 16}}
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
                <SnackbarContent style={{backgroundColor:'red',fontFamily:'Avenir, Nunito Sans, sans-serif', fontWeight:'900', fontSize: 16}}
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
  export default ViewProduct