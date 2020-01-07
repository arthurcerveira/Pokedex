import React, { Component } from "react";
import styled from "styled-components";

class NavBar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
          <a className="navbar-brand col-sn-5 col-md-2 mr-0 align-items-center">
            Pokedex
          </a>
        </nav>
      </div>
    );
  }
}

export default NavBar;
