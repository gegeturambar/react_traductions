import React, {Component} from 'react';

import { Redirect } from 'react-router-dom';
//import { Redirect } from 'react-dom';
import Api from '../../services/Api';

import './Traductions.css';
import Axios from 'axios';


class Traductions extends Component {

  numberByPage = 10;
  page = 0;

  constructor(props){
    super(props);
    this.myApi = new Api();
    
    this.state={
        traductions: [],
        authenticated: (Boolean)(sessionStorage.getItem('X-AUTH-TOKEN')),
        modificated: false
    };
    if(props.traductions){
      this.setState({traductions: props.traductions});
    }
    this.onChangeNumberByPage = this.onChangeNumberByPage.bind(this);
    this.onChangeTraduction = this.onChangeTraduction.bind(this);
    this.onPrevPage = this.onPrevPage.bind(this);
    this.onNextPage = this.onNextPage.bind(this);
  }

  getData(){
    var offset = this.numberByPage * this.page;
    this.myApi.getData('traductions', this.state, this.numberByPage , offset ).then( (result) => {
      let responseJson = result;
      if(responseJson.data){
        sessionStorage.setItem('traductionsData', responseJson.data);
        this.setState({traductions: responseJson.data});
        console.log(responseJson.data);
      }
    });
  }

  componentDidMount() {
    if(!this.state.traductions.length)
      this.getData();
  }


  onChangeNumberByPage(e){
    this.numberByPage = e.target.value;
    this.getData();
  }


  onDeleteTraduction(e){
        
    let headers = {};
    if(sessionStorage.getItem('X-AUTH-TOKEN')){
        headers['X-AUTH-TOKEN'] = sessionStorage.getItem('X-AUTH-TOKEN');
    }

    var config = {
      headers: headers
    };
    console.log(config);
    let id = parseInt((e.target.name.split("_"))[1]);
    let data = {
      id: id,
      value: e.target.value
    }
    this.myApi.deleteData("traduction",data).then( (result) => {
      if(result.data){
        let trad = this.state.traductions;
        trad.forEach(function(value,idx,theArray){
          if(value.id == result.data.id){
            trad[idx].value = result.data.value;
          }
        });
        this.setState({traductions: trad});
      }
    })
      /*
      Axios.delete('http://traductions.com/api/traduction/delete/2958',config).then( (result) => {
        console.log(result);
      });
      */
}

  onChangeTraduction(e){
    //Get id
    let id = parseInt((e.target.name.split("_"))[1]);
    let data = {
      id: id,
      value: e.target.value
    }

    this.myApi.putData("traduction",data).then( (result) => {
      if(result.data){
        let trad = this.state.traductions;
        trad.forEach(function(value,idx,theArray){
          if(value.id == result.data.id){
            trad[idx].value = result.data.value;
          }
        });
        this.setState({traductions: trad});
      }
    })
    
  }


  onPrevPage(e){
    this.page = this.page > 1 ? this.page-1 : 0;
    this.getData();
  }

  onNextPage(e){
    this.page++;
    this.getData();
  }

  render() {

    if(this.state.redirectToRefferer ){
      return (<Redirect to={'/home'}/>)
    }
    
 return (
<div>
<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
  <h1 class="h2">Gestion des traductions</h1>
  <div class="btn-toolbar mb-2 mb-md-0">
    <div class="btn-group mr-2">
      <button class="btn btn-sm btn-outline-secondary">Share</button>
      <button class="btn btn-sm btn-outline-secondary">Export</button>
    </div>
    <button class="btn btn-sm btn-outline-secondary dropdown-toggle">
      <span data-feather="calendar"></span>
      This week
    </button>
  </div>
</div>

<h2>Traductions</h2>
<div class="table-responsive">
  <table class="table table-striped table-sm">
    <thead>
      <tr>
        <th>id</th>
        <th>tag</th>
        <th>lang</th>
        <th>traduction</th>
      </tr>
    </thead>
    <tbody>
    {this.state.traductions.map(
      trad=>
      <tr>
        <td>{trad.id}</td>
        <td>{trad.tag}</td>
        <td>{trad.lang}</td>
        <td>{ this.state.authenticated ? <input type="text" value={trad.value} name={'traduction_'+trad.id} onChange={this.onChangeTraduction} />: trad.lang }</td>
      </tr>
    )}
    </tbody>
  </table>
</div>

 <label>
   Nombre d'enregistrements par page :
    <input
          type="text"
          value={this.state.numberByPage}
          ref="numberByPage"
          onChange={this.onChangeNumberByPage}
          name="numberByPage"
           />
  </label>

  <a href="#" onClick={this.onPrevPage}>
   Précédent
   </a>
  <a href="#" onClick={this.onNextPage}>
   Suivant
   </a>
   
   { this.state.authenticated ? <a href="/traductionForm">Créer une traduction</a> : '' }
  
 </div>
);
}
}
export default Traductions;