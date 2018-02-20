import React, {Component} from 'react';

import { Redirect } from 'react-router-dom';
import Api from '../../services/Api';
import './Login.css';


class Login extends Component {

  constructor(){
    super();
    this.state={
      username: '',
      password: '',
      redirectToRefferer: false
    };
    this.login = this.login.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  login(){
    if(this.state.username && this.state.password){
      Api.postData('login', this.state).then( (result) => {
        let responseJson = result;
        if(responseJson.userData){
          sessionStorage.setItem('userData', JSON.stringify(responseJson));
          this.setState({redirectToRefferer: true});
        }
      });
    }
  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

   render() {

    if(this.state.redirectToRefferer || sessionStorage.getItem('userData')){
      return (<Redirect to={'/home'}/>)
    }
    
 return (

 <div className="row" id="Body">
 <div className="medium-5 columns left">
 <h4>Login</h4>
 <label>Username</label>
 <input type="text" name="username" placeholder="Username" onChange={this.onChange} />
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