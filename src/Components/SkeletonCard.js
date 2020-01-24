import React, { Component } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Skeleton from '@material-ui/lab/Skeleton';

AOS.init();
class SkeletonCard extends Component {    
    render() {
        var dummy = [0,1,2,3];
        return (
            <div className="results"  data-aos="fade-up" data-aos-offset="50" >
            {dummy.map((item, index) => ( 
            <div key={item} data-aos="fade-up" data-aos-offset="50">
                <div className="resultCard" style={{height:'170px'}}>
                    <div variant="rect" style={{float: 'left', marginTop: '-25px', marginLeft: '-30px', position: 'absolute', background:'white', height:'30px', width:'90px', padding:'7px',zIndex:1}}>
                        <Skeleton  variant="rect" height={30}/>
                    </div>
                    <div className="flex-containter" style={{ flex: 'wrap', flexWrap: 'row',display: 'flex'}}>
                        <div className="imgClass" style={{ display: 'inline-block',padding: '5px 10px 10px 10px', zIndex: '0'}} >
                            <Skeleton  variant="rect" className="resultCardImg" style={{width: '160px', height: '160px', zIndex:0}}/>
                        </div>
                        <div className="resultCardContent" style={{width: '800px', paddingLeft: '20px'}}>
                            <Skeleton  variant="rect"  style={{margin: '5px'}} width={800} height={26}/>
                            <Skeleton  variant="rect"  style={{margin: '5px', display:'inline-block'}} width={500} height={26}/>
                            <div>
                                <Skeleton  variant="rect" style={{margin: '5px', display:'inline-block'}} width={200} height={35} />
                                <Skeleton  variant="rect" style={{margin: '5px', float:'right', display:'inline-block'}} width={150} height={26}/>
                            </div>
                            <br></br>
                            <div style={{ bottom: '0', position: 'relative', margin:'5px',marginTop:'-13px'}}>
                                <div style={{marginBottom: '10px'}}>
                                    <Skeleton  variant="rect"   style={{display: 'inline-block'}} width={150} height ={40}/>
                                    <Skeleton  variant="rect" style={{float:'right', }} width={150} height={40}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            ))}
        </div>
        );            
    }
}

export default SkeletonCard
