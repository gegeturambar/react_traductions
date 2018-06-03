import React, { Component } from 'react';
import './styles/bootstrap.min.css';
import './styles/dashboard.css';
import './styles/custom.css';

import Routes from './routes';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import MobileHeader from './components/MobileHeader/MobileHeader';

import Navigator from './components/Navigator/Navigator';
import Traductions from './components/Traductions/Traductions';


class App extends Component {

     constructor(props){
        super(props);
        this.state={
          isAuthenticated: false,
          appName: "Banana Project",
          home: false
       }
      }

     render() {
     return (
       <body>
          <Header name={this.state.appName} />
          <div class="container-fluid">
            <div class="row">
            <Navigator/>
            <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
              <Routes name={this.state.appName}/>
            </main>
              
              
         
            </div>
          </div>
       </body>
    );
  }
}
export default App;