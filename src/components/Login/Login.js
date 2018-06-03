import React, {Component} from 'react';

import { Redirect } from 'react-router-dom';
//import { Redirect } from 'react-dom';
import Api from '../../services/Api';
import './Login.css';


class Login extends Component {

  constructor(){
    super();
    this.myApi = new Api();

    this.state={
      email: '',
      password: '',
      redirectToRefferer: false
    };
    this.login = this.login.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  login(){
    if(this.state.email && this.state.password){
      this.myApi.postData('login', this.state).then( (result) => {
        let responseJson = result;
        console.log(responseJson);
        if(responseJson['data']['X-AUTH-TOKEN']){
          //sessionStorage.setItem('X-AUTH-TOKEN', JSON.stringify(responseJson));
          sessionStorage.setItem('X-AUTH-TOKEN', responseJson['data']['X-AUTH-TOKEN'] );          
          this.setState({redirectToRefferer: true});
        }
      });
    }
  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

   render() {

    if(this.state.redirectToRefferer || sessionStorage.getItem('X-AUTH-TOKEN')){
      return (<Redirect to={'/home'}/>)
    }
    
 return (

 <div className="row" id="Body">
 <div className="medium-5 columns left">
 <h4>Login</h4>
 <label>Email</label>
 <input type="text" name="email" placeholder="Email" onChange={this.onChange} />
 <label>Password</label>
 <input type="password" name="password" placeholder="Password" onChange={this.onChange} />
 <input type="submit" className="button success" value="Login" onClick={this.login} />
 <a href="/signup">Registration</a>
 </div>
 </div>
);
}
}
export default Login;