import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';

export class ShowProducts extends Component {

    state={
        response:false,
        invisible:false,
    }
    submit (){ 
        axios.post('https://pricewatch-antonk.herokuapp.com/rmProduct',{
                id: this.props.products._id,
                email: this.props.email
            })
            .then(res => {
                this.setState({
                    response:true,
                    invisible:true
                    })
                })
                .catch(err => {
                    this.setState({
                        response:false
                    })
                })
        }
    render() {
        return (
            <div style={{padding:'8px 24px 8px 24px'}}>
    
                    <div style={{marginBottom:'15px', opacity: this.state.invisible?"0.5":"1"}} >

                        <div className="flex-containter" style={{ flex: 'wrap', flexWrap: 'row',display: 'flex'}}>
                        <div className="imgClass-View" style={{ display: 'inline-block',padding: '5px 10px 10px 10px', zIndex: '0'}}>
                            <img className="resultCardImg" style={{width: '130px', height: '130px'}} alt={this.props.products.title} src={this.props.products.image} ></img>
                        </div>
                        <div >
                        <h6  style={{fontFamily:'avenir, Nunito Sans, sans-serif',fontWeight:'700', fontSize:'18px', margin:'0px',  display:'inline-block'}} >{this.props.products.title}</h6>
                        <h6 style={{fontFamily:'avenir, Nunito Sans, sans-serif',fontWeight:'900', fontSize:'23px', margin:'0px',  display:'inline-block'}}>{"$ " + this.props.products.priceList[this.props.products.priceList.length-1].price.toFixed(2)}</h6>
                        </div>
                        <Button disabled={this.state.invisible}  style={{color:'red', display:'inline-block', float:'right'}}><DeleteIcon style={{color:'red'}} onClick={this.submit.bind(this)}/></Button>
                        </div>
                    </div>
            </div>
        )
    }
}

export default ShowProducts
