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
        langues: [],
        redirectToRefferer: !(Boolean)(sessionStorage.getItem('X-AUTH-TOKEN')),
        tag: '',
        value: '',
        langueId: ''
    };

    if(sessionStorage.getItem('langues')){
      this.setState({langues: sessionStorage.getItem('langues')});
    }

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getlangues(){
    
    this.myApi.getData('langues', this.state ).then( (result) => {
      console.log(result);
    let responseJson = result;
    if(responseJson.data){
      sessionStorage.setItem('langues', responseJson.data);
      this.setState({langues: responseJson.data});
      this.setState({langueId: this.state.langues[0].id });
    }
    });
  }

  componentDidMount() {
    if(!this.state.langues.length)
      this.getlangues();
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
      langueId: this.state.langueId
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
    
    <select name="langueId" value={this.state.langueId} onChange={this.onChange}>
    {this.state.langues.map( 
      langue=>
      <option value={langue.id}>{langue.name}
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