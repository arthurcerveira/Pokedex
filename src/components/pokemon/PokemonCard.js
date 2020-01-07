import React, { Component } from "react";
import styled from "styled-components";

const Sprite = styled.img`
  width: 5em;
  height: 5em;
  display: none;
`;

class PokemonCard extends Component {
  state = {
    name: "",
    imageUrl: "",
    pokemonIndex: "",
    imageLoading: true
  };

  getImageUrl(index) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`;
  }

  componentDidMount() {
    const { name, url } = this.props;
    const pokemonIndex = url.split("/")[6];
    const imageUrl = this.getImageUrl(pokemonIndex);

    this.setState({
      name,
      imageUrl,
      pokemonIndex
    });
  }

  render() {
    return (
      <div className="col-md-3 col-sm-6 mb-5">
        <div className="card">
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
            <div class="spinner-border mx-auto spinner"></div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default PokemonCard;
