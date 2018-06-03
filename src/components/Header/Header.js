import React, {Component} from 'react';
import './Header.css';


class Header extends Component {

  constructor(){
    super();
    this.logout = this.logout.bind(this);
    //this.onSearch = this.onSearch.bind(this);
    this.state={
        authenticated: (Boolean)(sessionStorage.getItem('X-AUTH-TOKEN'))
    };
  }

  logout() {
    sessionStorage.removeItem('X-AUTH-TOKEN');
  }

  onSearch(e){
    console.log(this);
  }

   render() {
  return (
    <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Company name</a>
      <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search"/>
      <button value="Search" onClick={this.onSearch} >Search</button>
      <ul class="navbar-nav px-3">
        { this.state.authenticated ? <li class="nav-item text-nowrap"><a class="nav-link" href="#" onClick={this.logout} >Sign out</a></li> : <li class="nav-item text-nowrap"><a class="nav-link" href="/signin">Sign in</a><a class="nav-link" href="/login">Log in</a></li> }      
      </ul>
    </nav>
);
}
}
export default Header;