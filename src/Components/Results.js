import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


class Results extends Component {
    render() {
        return (
            <div style={{ alignItems: 'center',  margin: 'auto', minWidth:'1200px', justifyContent: 'center', marginTop: '40px'}}>
            {this.props.products.length!==0?
            this.props.products.map((product, index) => (
                <div className="flex-containter" style={{ alignItems: 'center',  margin: 'auto', width:'1000px', height: '170px', background: 'white', marginBottom: '30px', boxShadow: '0px 0px 12px #dfdfdf', padding: '5px'}}>
                
                <div style={{display: 'inline-block', width: '150px', height: '150px', padding: '20px' }}>
                    <img  style={{width:'100%', height:'100%', objectFit: 'contain', opacity:'1', display: 'inline-block' }} src={product.image}></img>
                </div>
                
                <div style={{display: 'inline-block'}}>
                <h6 style={{color: 'black'}}>{product.title}</h6>
                <h6 style={{color: 'black'}}>${product.priceList[product.priceList.length-1].price.toFixed(2)}</h6>
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
