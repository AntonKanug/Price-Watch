import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import ShowProduct from './ShowProducts'

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
    
    state={
        textField: null,
        show: false,
        progress: false,
        error: false,
        product: '',
        email: ''
    }
    
      //Filter from entered textField
      filter = (email) => {
          return email.emailList.includes(this.state.email.toLowerCase())
      }
    
      
    submit (){
        axios.post('https://pricewatch-antonk.herokuapp.com/addProduct',{
            title: this.state.product,
            email: this.state.email
        })
        .then(res => {
            this.setState({
                product: '',
                email: '',
                })
            })
        .catch(err => {
            this.setState({
                error: true,
            })
        })
    }

    render() {
        var data = this.props.data
        var filteredData = data!=null? data.filter(this.filter):[]
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
            
                {filteredData.length != 0 && this.state.email!=""? filteredData.map((product,index) => (<ShowProduct products={product} email={this.state.email}/> )):
                    <div style={{width:'100%', marginTop:'40px', marginBottom:'40px', justifyContent:'center', justifyItems: 'center'}}>
                    <img src={'assets/notFoundImg.png'} style={{maxWidth:'450px',textAlign:'center'}} alt="" className="center"/>
                    <h2 style={{textAlign:'center',fontFamily:'avenir, Nunito Sans, sans-serif',fontWeight:'900', marginTop:'10px', fontSize:'35px'}}>View Your Products</h2>
                </div>   
                }
            </Dialog>
            
            <Button disabled={data==null} variant='contained' style={{marginTop:"0px", marginLeft:'10px',borderRadius:'100px', background:'#FEBD69', fontFamily:'Avenir, Nunito Sans, sans-serif', fontWeight:'900', textTransform:'none', fontSize:'20px', padding:'0px 25px 0px 25px'}} 
            onClick={() => this.setState({show:true, added: false, error: false, emailValid: true})}>View Products</Button>
            </div>
           );            
      }
  }
  
  export default ViewProduct