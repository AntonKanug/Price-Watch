import React, { Component } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Line } from 'react-chartjs-2'
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CallMadeIcon from '@material-ui/icons/CallMade';
AOS.init();

class Graphs extends Component {

    render() {
        var i;
        var prices = [];
        var dates = [];
        var minPrice = this.props.productInfo.priceList[0].price;
        var maxPrice= minPrice;
        var avgPrice = 0;
        for (i = 0; i < this.props.productInfo.priceList.length; i++) { 
            prices[i] = this.props.productInfo.priceList[i].price
            dates[i] = this.props.productInfo.priceList[i].dateTime.slice(5, 10)
            minPrice = minPrice > prices[i] ? prices[i] : minPrice
            maxPrice = maxPrice < prices[i] ? prices[i] : maxPrice
            avgPrice += prices[i]
          }
          avgPrice = avgPrice/i
          const data = (canvas) => {
            const ctx = canvas.getContext("2d")
            var gradientstroke = ctx.createLinearGradient(700, 0, 0, 0);
            gradientstroke.addColorStop(0, '#FFC400');
            gradientstroke.addColorStop(1, '#F77313');
            
            var gradientfill = ctx.createLinearGradient(700, 0, 0, 0);
            gradientfill.addColorStop(0, 'rgb(255, 221, 36, 0.87)');
            gradientfill.addColorStop(1, 'rgb(253, 119, 6, 0.8)');
            return {
                labels: dates,
                datasets: [{
                    label: 'Price',
                    data: prices,
                    pointBorderWidth: 2,
                    pointHoverRadius: 2,
                    borderColor: gradientstroke,
                    backgroundColor: gradientfill,
                    borderWidth: 3,
                }]
              }
            }
        return (
            
            // 'rgba(237,204,23, 0.6)'
        
        <div >
        <div style={{width: '800px', height: '250px', display: 'inline-block', paddingLeft:'15px'}}>
            {console.log(prices)}
            <Line 
                width={800}
                height={230}
                data={data}
                options={{maintainAspectRatio: 'false',
                scales: {
                    xAxes: [{
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            color: "rgba(0, 0, 0, 0)",
                        }   
                    }]
                }
            }}
            /> 
            </div>
            <div style={{display: 'inline-block', marginTop: '8px', float:'right', paddingRight:'15px', textAlign:'right'}}>
            <h6 className="resultCardTitle" style={{margin:'5px', marginBottom: '1px', fontWeight:'500', fontSize:'17px'}}>Maximum Price</h6>
            <h6 className="resultCardTitle" style={{margin:'5px', color: '#ff410c', fontSize:'28.5px'}}>${maxPrice.toFixed(2)}</h6>
            <h6 className="resultCardTitle" style={{margin:'5px', marginBottom: '1px', fontWeight:'500', fontSize:'17px'}}>Minimum Price</h6>
            <h6 className="resultCardTitle" style={{margin:'5px', color: 'rgb(84, 209, 0)', fontSize:'28.5px'}}>${minPrice.toFixed(2)}</h6>
            <h6 className="resultCardTitle" style={{margin:'5px', marginBottom: '1px', fontWeight:'500', fontSize:'17px'}}>Average Price</h6>
            <h6 className="resultCardTitle" style={{margin:'5px', color:'#286EF2', fontSize:'28.5px'}}>${avgPrice.toFixed(2)}</h6>
            </div>
            </div>
         );            
    }
}

export default Graphs
