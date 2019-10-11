import React, { Component } from 'react';
import { Link,NavLink } from 'react-router-dom';

class Navbar extends Component {

  render() {
    return (
    <div>
    <nav>
    <div class="nav-wrapper teal lighten-2">
      <a href="#" class="brand-logo">Smart Insurance Using blockchain</a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
      
      <li>{ this.props.account }</li>
      </ul>
    </div>
  </nav>
  </div>
    );
  }
}
export default Navbar;
