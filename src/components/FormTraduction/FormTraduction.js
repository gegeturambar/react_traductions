import React, {Component} from 'react';

import { Redirect } from 'react-router-dom';
//import { Redirect } from 'react-dom';
import Api from '../../services/Api';

import './FormTraduction.css';
import Axios from 'axios';


class FormTraduction extends Component {

  numberByPage = 10;
  page = 0;

  constructor(props){
    super(props);
    this.myApi = new Api();
    
    this.state={
        locales: [],
        redirectToRefferer: !(Boolean)(sessionStorage.getItem('X-AUTH-TOKEN')),
        tag: '',
        value: '',
        localeId: ''
    };

    if(sessionStorage.getItem('locales')){
      this.setState({locales: sessionStorage.getItem('locales')});
    }

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getLocales(){
    
    this.myApi.getData('locales', this.state ).then( (result) => {
    let responseJson = result;
    if(responseJson.data){
      sessionStorage.setItem('locales', responseJson.data);
      this.setState({locales: responseJson.data});
      this.setState({localeId: this.state.locales[0].id });
    }
    });
  }

  componentDidMount() {
    if(!this.state.locales.length)
      this.getLocales();
  }


  onChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit(e){
    e.preventDefault();
    //Get id
    //let id = parseInt((e.target.name.split("_"))[1]);
    
    let data = {
      tag: this.state.tag,
      value: this.state.value,
      localeId: this.state.localeId
    }
    
    this.myApi.postData("traduction/create",data).then( (result) => {
      if(result.status == 201){
        this.setState({redirectToRefferer: true});
      }
    })
    
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

<h2>Créer une traduction</h2>
<div class="table-responsive">
  <form onSubmit={this.handleSubmit}>
    
    <select name="localeId" value={this.state.localeId} onChange={this.onChange}>
    {this.state.locales.map( 
      locale=>
      <option value={locale.id}>{locale.name}
      </option>
    )}
    </select>
    <label>tag</label>
    <input name="tag" type="text" value={this.state.tag} onChange={this.onChange} />

    <label>value</label>
    <input name="value" type="text" value={this.state.value} onChange={this.onChange} />

    <input type="submit" value="Submit" />
  </form>
  
 </div>
 </div>
);
}
}
export default FormTraduction;