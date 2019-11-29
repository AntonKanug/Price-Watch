import React, {Component} from 'react';
import Search from './Search';
import Navbar from './Navbar';
// import ReactTypingEffect from 'react-typing-effect';
import './App.css';

class Homepage extends Component{
  constructor(props){
    super(props);
    this.list = null
  }

  state = {
    response:false
  }

  //Getting list from the backend
//   componentDidMount() {
//     axios.get('https://devkit-backend.herokuapp.com/softwareTools')
//       .then((res) => {
//         this.list=res.data;
//         this.setState({
//           response:true
//         });

//       })
//       .catch(err => {
//         console.log(err);
//       })
//   }
  
  render() {
    var frameworkCount=0,libCount=0, apiCount=0,i;
    // if (this.list!=null){
    //   for (i = 0; i < this.list.length; i++) { 
    //     if (this.list[i].type === "Framework"){frameworkCount+=1}
    //     if (this.list[i].type === "Library"){libCount+=1}
    //     if (this.list[i].type === "API"){apiCount+=1}
    //   }
    // }

    // if (frameworkCount === undefined){frameworkCount=0}
    // if (libCount === undefined){libCount=0}
    // if (apiCount === undefined){apiCount=0}
    // var totaList=apiCount+libCount+frameworkCount
    
    return(
      <div>
        <Navbar/>
        <div style={{flexWrap:'wrap', flexDirection: 'row', justifyContent: 'center', display:'flex', maxWidth:'1200px', marginRight:'auto', marginLeft:'auto', marginBottom:'40px'}} className='mainPage'>
          <div style={{marginTop:'20px', maxWidth:'550px'}}>
            <h1 className="mainTitle" style={{ marginLeft:'-10px'}}>Price</h1>
            <h1 className="mainTitle" style={{ marginLeft:'-10px', marginTop: '-50px'}}>Watch</h1>
            <h3 className="subTitle" style={{marginTop:'-40px', marginLeft:'10px'}}>Search and Track prices of your favourite items from <b>amazon.ca</b></h3>
             {/* <ReactTypingEffect className="subTitle-text" style={{fontWeight:'400', cursor:'text'}} speed='50' eraseDelay="1500"
                text={[totaList.toString()+' Total Tools',apiCount.toString()+" APIs", libCount.toString()+" Libraries", frameworkCount.toString()+' Frameworks']}
              /> */}
         </div>
         <div style={{maxWidth:'500px'}}>
          <img src={'assets/homeImg.png'} className='mainImage' alt=""></img>
         </div>
        </div>
        <Search/>
        {/* {this.list!=null? <Search cardInfos={this.list} />:null} */}
      </div>
    )
  }
}

export default Homepage;