import React from 'react';
import './App.css';
import { Route } from 'react-router-dom'
import NavbarComp from './components/navbar' //import component
import Home from './pages/homepage' //import page

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div>
        {/* NavbarComp : merupakan component yg di import dari file navbar.js, karena navbar muncul disetiap page maka di import di App.js  
            Cara memberi data pada components react bisa melalui props jika component ya dibuat dengan functional component.
            Props dibuat didalam <tag> componentnya.
            Examp : <Component_yg_di_import namaProps=data>props.children</Component_yg_di_import>
            contoh code dibawah ini 
            ⬇
            ⬇        
        */}
        <NavbarComp data="Michel" hobby="gowes">Di Sudirman</NavbarComp>
        <div>
          <Route path="/" component={Home} exact />
        </div>
      </div>
    );
  }
}

export default App;
