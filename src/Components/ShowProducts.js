import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

export class ShowProducts extends Component {
    render() {
        return (
            <div style={{padding:'8px 24px 8px 24px'}}>
                {this.props.products.length!==0?
                    this.props.products.map((product, index) => (
                    <div style={{marginBottom:'15px'}}>

                        <div className="flex-containter" style={{ flex: 'wrap', flexWrap: 'row',display: 'flex'}}>
                        <div className="imgClass-View" style={{ display: 'inline-block',padding: '5px 10px 10px 10px', zIndex: '0'}}>
                            <img className="resultCardImg" style={{width: '130px', height: '130px'}} alt={product.title} src={product.image} ></img>
                        </div>
                        <div >
                        <h6  style={{fontFamily:'avenir, Nunito Sans, sans-serif',fontWeight:'700', fontSize:'18px', margin:'0px',  display:'inline-block'}} >{product.title}</h6>
                        <h6 style={{fontFamily:'avenir, Nunito Sans, sans-serif',fontWeight:'900', fontSize:'23px', margin:'0px',  display:'inline-block'}}>{"$ " + product.priceList[product.priceList.length-1].price.toFixed(2)}</h6>
                        </div>
                        <Button style={{color:'red', display:'inline-block', float:'right'}}><DeleteIcon style={{color:'red'}}/></Button>
                        </div>
                        </div>
              
                )): 
                <div style={{width:'100%', marginTop:'40px', marginBottom:'40px', justifyContent:'center', justifyItems: 'center'}}>
                    <img src={'assets/notFoundImg.png'} style={{maxWidth:'450px',textAlign:'center'}} alt="" className="center"/>
                    <h2 style={{textAlign:'center',fontFamily:'avenir, Nunito Sans, sans-serif',fontWeight:'900', marginTop:'10px', fontSize:'35px'}}>View Your Products</h2>
                </div>}
            </div>
        )
    }
}

export default ShowProducts
