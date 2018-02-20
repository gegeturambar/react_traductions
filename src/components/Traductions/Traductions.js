import React, {Component} from 'react';

import { Redirect } from 'react-router-dom';
import Api from '../../services/Api';

import './Traductions.css';


class Traductions extends Component {

  constructor(){
    super();
    this.myApi = new Api();
    this.state={
        traductions: []
    };
    this.onChange = this.onChange.bind(this);
  }

  getData(){
    this.myApi.getData('traductions', this.state).then( (result) => {
    let responseJson = result;
    if(responseJson){
      //let trad = JSON.stringify(responseJson);
      //sessionStorage.setItem('traductionsData', trad);
      sessionStorage.setItem('traductionsData', responseJson);
      //this.setState({traductions: trad});
      this.setState({traductions: responseJson});
      console.log(this.state.traductions);
    }
    });
  }

  componentDidMount() {
    this.getData();
  }

  

  onChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

   render() {

    if(this.state.redirectToRefferer ){
      return (<Redirect to={'/home'}/>)
    }
    
 return (

 <div className="row" id="Body">
 <div className="medium-5 columns left">
 <h4>Traductions</h4>
 {this.state.traductions.map(trad=><li key={trad.id}>{trad.tag}</li>)}
 </div>
 </div>
);
}
}
export default Traductions;