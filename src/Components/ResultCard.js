import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CallMadeIcon from '@material-ui/icons/CallMade';
import CloseIcon from '@material-ui/icons/Close';
import TimelineIcon from '@material-ui/icons/Timeline';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Rating from '@material-ui/lab/Rating';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Graphs from './Graphs';

AOS.init();
class ResultCard extends Component {
    state={
        showGraph:false
    }
    
    render() {
        var priceList = this.props.product.priceList
        var listLen = priceList.length
        var percentChange = (0).toFixed(2)
        var currency
        if (priceList.length > 1)
            percentChange = ((priceList[listLen-1].price-priceList[listLen-2].price)*100/priceList[listLen-2].price).toFixed(2)
        if (this.props.product.URL.slice(19,21)==="ca")
            currency = "CAD"
        else if (this.props.product.URL.slice(19,22)==="com")
            currency = "USD"
        if (this.state.showGraph) document.title = "Price Watch | " + this.props.product.title;
        else document.title = "Price Watch"
        return (
            <div data-aos="fade-up" data-aos-offset="50">
                <div className="resultCard" style={{height: this.state.showGraph? '400px': '170px'}}>{ this.props.product.available?
                    <h4 style={{ color: 'white', height: '18px', float: 'left', marginTop: '-25px', zIndex: '1',background: 'linear-gradient(to bottom right, #23D932, #2fD932)', padding: '8px', marginLeft: '-30px', position: 'absolute'}}>In Stock</h4>
                    :
                    <h4 style={{ color: 'white', height: '18px', float: 'left', marginTop: '-25px', zIndex: '1',background: 'linear-gradient(to bottom right, #ff410c, #fa410c)', padding: '8px', marginLeft: '-30px', position: 'absolute'}}>Out of Stock</h4>}
                    <div className="flex-containter" style={{ flex: 'wrap', flexWrap: 'row',display: 'flex'}}>
                        <div className="imgClass" style={{ display: 'inline-block',padding: '5px 10px 10px 10px', zIndex: '0'}}>
                            <img className="resultCardImg" style={{width: '160px', height: '160px'}} alt={this.props.product.title} src={this.props.product.image} ></img>
                        </div>
                        <div className="resultCardContent" style={{width: '800px', paddingLeft: '20px'}}>
                            <h6 className="resultCardTitle" style={{margin: '5px', width: '800px'}}>{this.props.product.title}</h6>
                            {this.props.product.available?
                            <h6 className="resultCardPrice" style={{margin:'5px', marginTop:'0px'}}>{currency + " $"+ priceList[listLen-1].price.toFixed(2)}<l style={{fontWeight:900, fontSize:19, color: percentChange>0? "#ff410c": percentChange<0? "rgb(84, 209, 0)": "#b3b1b0"}}> ({(percentChange>=0? "+":"") + percentChange}%)</l></h6>
                            :<h6 className="resultCardPrice" style={{margin:'5px', marginTop:'0px'}}>Currently Unavailable</h6>}
                            <div style={{display:'inline-block', float:'right'}}>
                                <Rating name="read-only" value={this.props.product.rating} precision={0.1} readOnly />
                            </div>
                            <br></br>
                            <div style={{ bottom: '0', position: 'relative'}}>
                                <div style={{marginBottom: '10px'}}>
                                    <Button variant="contained" href={this.props.product.URL} target="_blank" style={{fontFamily: 'avenir, Nunito Sans, sans-serif', fontWeight: '700',backgroundColor: '#FEBD69'}} endIcon={<CallMadeIcon/>}>View Product</Button>
                                    <Button style={{float: 'right', fontFamily: 'avenir, Nunito Sans, sans-serif', fontWeight: '700'}} 
                                            onClick={ ()=>{ this.setState({showGraph:!this.state.showGraph}) }} 
                                            startIcon={this.state.showGraph? 
                                                <CloseIcon style={{color: "#ff410c", fontSize: 27, fontWeight: 900}}/>:
                                                <TimelineIcon style={{color: "rgb(84, 209, 0)", fontSize: 27, fontWeight: 900}}/>}>
                                            {this.state.showGraph? "Close Chart":"View Chart"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.state.showGraph?<Graphs productInfo={this.props.product}/>: null}
                </div>
            </div>
         );            
    }
}

export default ResultCard
