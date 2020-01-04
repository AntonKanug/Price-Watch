import React, { Component } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Chart from 'react-apexcharts'
AOS.init();

class Graphs extends Component {

    render() {
        var takeRight = require('lodash.takeright');
        var prices = [], dates = [];
        var minPrice = this.props.productInfo.priceList[0].price;
        var maxPrice = minPrice;
        var i, avgPrice = 0;
        for (i = 0; i < this.props.productInfo.priceList.length; i++) { 
            prices[i] = this.props.productInfo.priceList[i].price
            dates[i] = this.props.productInfo.priceList[i].dateTime.slice(4, 10)
            avgPrice += prices[i]
          }
        minPrice = Math.min(...prices).toFixed(2)
        maxPrice = Math.max(...prices).toFixed(2)
        avgPrice = (avgPrice/i).toFixed(2)
        prices = takeRight(prices, 14)
        dates = takeRight(dates, 14)

            this.state = {
                options: {
                    fill: {
                        colors: [ '#faa614','#FFC400'],
                        gradient: {
                            enabled: true,
                            opacityFrom:1,
                            opacityTo: 0.6,
                            gradientToColors:['#FFC400']
                            }
                        },
                        colors: ["#ff9819"],
                            stroke: {
                                width: 3
                            },
                        dataLabels: {
                            enabled: false
                        },
                        stroke: {
                            curve: 'smooth'
                        },
                        chart: {
                            fontFamily: 'Avenir, Nunito Sans, sans-serif',
                            id: "Graph for " + this.props.productInfo.title,
                            toolbar: {
                                autoSelected: "pan",
                                show: true
                            }
                        },
                        markers: {
                            size: 5,
                            colors: ["white"],
                            strokeColor: "#ff9819",
                            strokeWidth: 3
                        },
                        xaxis: {
                            categories: dates
                        }
                        },
                        series: [{
                            name: 'Price',
                            data: prices
                            }],
                    }

        return (
        <div >
            <div style={{width: '810px', height: '250px', display: 'inline-block', paddingLeft:'15px'}}>
            <Chart options={this.state.options} series={this.state.series} type="area" width={800} height={240}/>
                </div>
                <div style={{display: 'inline-block', marginTop: '8px', float:'right', paddingRight:'15px', textAlign:'right'}}>
                    <h6 className="resultCardTitle" style={{margin:'5px', marginBottom: '1px', fontWeight:'500', fontSize:'17px'}}>Maximum Price</h6>
                    <h6 className="resultCardTitle" style={{margin:'5px', color: '#ff410c', fontSize:'28.5px'}}>${maxPrice}</h6>
                    <h6 className="resultCardTitle" style={{margin:'5px', marginBottom: '1px', fontWeight:'500', fontSize:'17px'}}>Minimum Price</h6>
                    <h6 className="resultCardTitle" style={{margin:'5px', color: 'rgb(84, 209, 0)', fontSize:'28.5px'}}>${minPrice}</h6>
                    <h6 className="resultCardTitle" style={{margin:'5px', marginBottom: '1px', fontWeight:'500', fontSize:'17px'}}>Average Price</h6>
                    <h6 className="resultCardTitle" style={{margin:'5px', color:'#286EF2', fontSize:'28.5px'}}>${avgPrice}</h6>
                </div>
            </div>
         );            
    }
}

export default Graphs
