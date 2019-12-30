import React, { Component } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ResultCard from './ResultCard';
AOS.init();

class Results extends Component {
    render() {
        return (
            <div className="results">
                {this.props.products.length!==0?
                    this.props.products.map((product, index) => (
                        <ResultCard key={index} product={product}/>
                )): 
                <div style={{width:'100%', marginTop:'40px', marginBottom:'40px', justifyContent:'center', justifyItems: 'center'}}>
                    <img src={'assets/notFoundImg.png'} style={{maxWidth:'450px',textAlign:'center'}} alt="" className="center"/>
                    <h2 style={{textAlign:'center',fontFamily:'avenir, sans-serif',fontWeight:'900', marginTop:'10px', fontSize:'35px'}}>No Products Found</h2>
                </div>}
            </div>
         );            
    }
}

export default Results
