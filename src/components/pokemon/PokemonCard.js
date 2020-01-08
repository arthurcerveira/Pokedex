import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Sprite = styled.img`
  width: 5em;
  height: 5em;
  display: none;
`;

const Card = styled.div`
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.21);
  }
  -moz-user-select: none;
  -website-user-select: none;
  user-select: none;
  -o-user-select: none;
`;

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

class PokemonCard extends Component {
  state = {
    name: "",
    imageUrl: "",
    apiIndex: "",
    pokemonIndex: "",
    imageLoading: true
  };

  getPokemonIndex(apiIndex) {
    let pokemonIndex = apiIndex;

    while (pokemonIndex.length < 3) pokemonIndex = "" + "0" + pokemonIndex;

    return pokemonIndex;
  }

  getImageUrl(index) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`;
  }

  componentDidMount() {
    const { name, url } = this.props;
    const apiIndex = url.split("/")[6];
    const imageUrl = this.getImageUrl(apiIndex);
    const pokemonIndex = this.getPokemonIndex(apiIndex);

    this.setState({
      name,
      imageUrl,
      pokemonIndex,
      apiIndex
    });
  }

  render() {
    return (
      <div className="col-md-3 col-sm-6 mb-5">
        <StyledLink to={`pokemon/${this.state.apiIndex}`}>
          <Card className="card">
            <h5 className="card-header text-capitalize">
              <b>{this.state.pokemonIndex + " "}</b>
              {this.state.name}
            </h5>

            <div className="card-body mx-auto">
              <Sprite
                className="card-img-top rounded mx-auto mt-2 "
                onLoad={() => this.setState({ imageLoading: false })}
                src={this.state.imageUrl}
                style={this.state.imageLoading ? null : { display: "block" }}
              ></Sprite>
            </div>

            {this.state.imageLoading ? (
              <div className="spinner-border mx-auto spinner"></div>
            ) : null}
          </Card>
        </StyledLink>
      </div>
    );
  }
}

export default PokemonCard;
