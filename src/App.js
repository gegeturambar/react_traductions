import React, { Component } from 'react';
import './styles/foundation.min.css';
import './styles/custom.css';

import Routes from './routes';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import MobileHeader from './components/MobileHeader/MobileHeader';

import Traductions from './components/Traductions/Traductions';


class App extends Component {

     constructor(props){
        super(props);
        this.state={
        appName: "Banana Project",
        home: false
       }
      }

     render() {
     return (
       <div className="off-canvas-wrapper">
        <div className="off-canvas-wrapper-inner" data-off-canvas-wrapper>
          <div className="off-canvas-content" data-off-canvas-content>
          <MobileHeader name={this.state.appName} />
          <Header name={this.state.appName} />
          <Routes name={this.state.appName}/>
          <Traductions/>
          <hr/>
          <Footer/>
          </div>
        </div>
       </div>
    );
  }
}
export default App;