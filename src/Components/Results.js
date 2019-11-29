import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Box from '@material-ui/core/Box';
import CallMadeIcon from '@material-ui/icons/CallMade';
import Rating from '@material-ui/lab/Rating';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();
class Results extends Component {
    render() {
        return (
            <div className="results">
            {this.props.products.length!==0?
            this.props.products.map((product, index) => (
                <div data-aos="fade-up" data-aos-offset="150">
                <div className="resultCard">
                <div key={index} className="flex-containter" >
                
                <div className="imgClass">
                    <img className="resultCardImg" src={product.image}></img>
                </div>
                
                <div className="resultCardContent" >
                <h6 className="resultCardTitle" style={{margin:'5px'}}>{product.title}</h6>
                <h6 className="resultCardPrice" style={{margin:'5px', marginTop:'0px'}}>${product.priceList[product.priceList.length-1].price.toFixed(2)}</h6>
                <div style={{display:'inline-block'}}>
                <Rating name="read-only" value={product.rating}  precision={0.1} readOnly />
                </div>
                <br></br>
                <Button
                variant="contained"
                color="default"
                href={product.URL}
                target="_blank"
                style={{disply: "inherit", fontFamily:'avenir', fontWeight:'700'}}
                endIcon={<CallMadeIcon/>}>View Product</Button>
                </div>

            </div>
            </div>
            </div>
              )): 
              
            <div style={{width:'100%', marginTop:'40px', marginBottom:'40px', justifyContent:'center', justifyItems: 'center'}}>
            <img src={'assets/notFoundImg.png'} style={{maxWidth:'450px',textAlign:'center'}} alt="" className="center"/>
            <h2 style={{textAlign:'center',fontFamily:'avenir',fontWeight:'900', marginTop:'10px', fontSize:'35px'}}>No Products Found</h2>
            </div>}
            </div>
         );            
    }
}

export default Results
