import React, { Component } from 'react';
import { Line } from 'react-chartjs-2'
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

class Graphs extends Component {

    render() {
        var prices = [], dates = [];
        var minPrice = this.props.productInfo.priceList[0].price;
        var maxPrice = minPrice;
        var i, avgPrice = 0;
        for (i = 0; i < this.props.productInfo.priceList.length; i++) { 
            prices[i] = this.props.productInfo.priceList[i].price
            dates[i] = this.props.productInfo.priceList[i].dateTime.slice(5, 10)
            avgPrice += prices[i]
          }
          var minPrice = Math.min(...prices).toFixed(2)
          var maxPrice = Math.max(...prices).toFixed(2)
          avgPrice = (avgPrice/i).toFixed(2)

          const data = (canvas) => {
            const ctx = canvas.getContext("2d")
            var gradientstroke = ctx.createLinearGradient(700, 0, 0, 0);
            gradientstroke.addColorStop(0, '#FFC400');
            gradientstroke.addColorStop(1, '#F77313');
            var gradientfill = ctx.createLinearGradient(700, 0, 0, 0);
            gradientfill.addColorStop(0, 'rgb(255, 221, 36, 0.9)');
            gradientfill.addColorStop(1, 'rgb(253, 119, 6, 0.9)');
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
        <div >
            <div style={{width: '800px', height: '250px', display: 'inline-block', paddingLeft:'15px'}}>
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
