import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:focus,
  &:hover,
  &:link,
  &:visited,
  &:active {
    text-decoration: none;
    color: black;
  }
`;

class NavBar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
          <StyledLink to="/">
            <a className="navbar-brand col-sn-5 col-md-2 mr-0 align-items-center">
              Pokedex
            </a>
          </StyledLink>
        </nav>
      </div>
    );
  }
}

export default NavBar;
