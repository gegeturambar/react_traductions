import React, {Component} from 'react';

import { Redirect } from 'react-router-dom';
//import { Redirect } from 'react-dom';
import Api from '../../services/Api';

import './Signup.css';


class Signup extends Component {

  constructor(){
    super();
    this.myApi = new Api();
    this.state={
      email: '',
      password: '',
      username: '',
      firstname: '',
      lastname: '',
      redirectToRefferer: false
    };
    this.signup = this.signup.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  signup(){
    
    if(this.state.email && this.state.password){
      this.myApi.postData('signup', this.state).then( (result) => {
        let responseJson = result;
        if(responseJson.userData){
          sessionStorage.setItem('userData', JSON.stringify(responseJson));
          this.setState({redirectToRefferer: true});
        }
      });
    }
  }

   render() {

    if(this.state.redirectToRefferer || sessionStorage.getItem('userData')){
      return (<Redirect to={'/home'}/>)
    }

 return (
 <div className="row" id="Body">
 <div className="medium-5 columns left">
 <h2>Signup</h2>
 <label>Email</label>
 <input type="text" name="email" placeholder="Email" onChange={this.onChange} />
 <label>Password</label>
 <input type="password" name="password" placeholder="Password" onChange={this.onChange} />
 <label>Firstname</label>
 <input type="text" name="firstname" placeholder="Firstname" onChange={this.onChange} />
 <label>Lastname</label>
 <input type="text" name="lastname" placeholder="Lastname" onChange={this.onChange} />

 <input type="submit" className="button success" value="Registration" onClick={this.signup} />
 <a href="/login">Login</a>
 </div>
 </div>
);
}
}
export default Signup;
