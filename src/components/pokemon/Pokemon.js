import React, { Component } from "react";
import axios from "axios";

import TYPE_COLORS from "../../typeColors";

class Pokemon extends Component {
  state = {
    name: "",
    pokemonIndex: "",
    pokemonUrl: "",
    types: [],
    description: "",
    stats: {
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      spAttack: "",
      spDefense: ""
    },
    height: "",
    weight: "",
    eggGroups: "",
    catchRate: "",
    abilities: "",
    genderRatioMale: "",
    genderRatioFemale: "",
    evs: "",
    hatchSteps: "",
    themeColor: "#EF5350"
  };

  getGenderRatio(femaleRate) {
    const genderRatioFemale = 12.5 * femaleRate;
    const genderRatioMale = 12.5 * (8 - femaleRate);

    return {
      genderRatioFemale: genderRatioFemale,
      genderRatioMale: genderRatioMale
    };
  }

  pokemonIndexLenghtFix() {
    while (this.state.pokemonIndex.length < 3)
      this.setState({ pokemonIndex: "" + "0" + this.state.pokemonIndex });
  }

  getStats(stats) {
    let { hp, attack, defense, speed, specialAttack, specialDefense } = "";

    stats.map(stat => {
      switch (stat.stat.name) {
        case "hp":
          hp = stat["base_stat"];
          break;
        case "attack":
          attack = stat["base_stat"];
          break;
        case "defense":
          defense = stat["base_stat"];
          break;
        case "speed":
          speed = stat["base_stat"];
          break;
        case "special-attack":
          specialAttack = stat["base_stat"];
          break;
        case "special-defense":
          specialDefense = stat["base_stat"];
          break;
        default:
          break;
      }
    });

    return { hp, attack, defense, speed, specialAttack, specialDefense };
  }

  async componentDidMount() {
    let { pokemonIndex } = this.props.match.params;

    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`;
    const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}`;

    const pokemonRes = await axios.get(pokemonUrl);
    const name = pokemonRes.data.name;

    const imageUrl = pokemonRes.data.sprites.front_default;

    const {
      hp,
      attack,
      defense,
      speed,
      specialAttack,
      specialDefense
    } = this.getStats(pokemonRes.data.stats);

    // Convert height from decimeters to meters
    const height = pokemonRes.data.height / 10;
    // Convert weight from hectograms to kilograms
    const weight = pokemonRes.data.weight / 10;

    const types = pokemonRes.data.types.map(type => type.type.name);
    const abilities = pokemonRes.data.abilities.map(
      ability => ability.ability.name
    );

    const evs = pokemonRes.data.stats
      .filter(stat => {
        return stat.effort;
      })
      .map(stat => {
        return `${stat.effort} ${stat.stat.name}`;
      })
      .join(", ");

    await axios.get(pokemonSpeciesUrl).then(res => {
      let description = "";
      res.data.flavor_text_entries.some(flavor => {
        if (flavor.language.name === "en") {
          description = flavor.flavor_text;
          return;
        }
      });

      const femaleRate = res.data["gender_rate"];
      const { genderRatioFemale, genderRatioMale } = this.getGenderRatio(
        femaleRate
      );

      const catchRate = Math.round((100 / 255) * res.data["capture_rate"]);
      const eggGroups = res.data["egg_groups"].map(group => group.name);
      const hatchSteps = 255 * (res.data["hatch_counter"] + 1);
      const themeColor = res.data["color"]["name"];

      this.setState({
        description,
        genderRatioFemale,
        genderRatioMale,
        catchRate,
        eggGroups,
        hatchSteps,
        themeColor
      });
    });

    this.setState({
      imageUrl,
      pokemonIndex,
      name,
      types,
      stats: {
        hp,
        attack,
        defense,
        speed,
        specialAttack,
        specialDefense
      },
      height,
      weight,
      abilities,
      evs
    });

    this.pokemonIndexLenghtFix();
  }

  getStatBar(stat) {
    return (
      <div className="row align-items-center">
        <div className={`col-12 col-md-3 text-capitalize`}>{stat}</div>
        <div className={`col-12 col-md-9`}>
          <div className="progress">
            <div
              className="progress-bar "
              role="progressbar"
              style={{
                width: `${this.state.stats[stat]}%`,
                backgroundColor: `${this.state.themeColor}`
              }}
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <small>{this.state.stats[stat]}</small>
            </div>
          </div>
        </div>
      </div>
    );
  }

  getPokemonAttribute(attribute, measure = "") {
    return (
      <div className="row">
        <div className="col-md-6">
          <h6 className="float-right text-capitalize">{`${attribute}:`}</h6>
        </div>
        <div className="col-md-6">
          <h6 className="float-left text-capitalize">{`${this.state[attribute]} ${measure}`}</h6>
        </div>
      </div>
    );
  }

  getGenderRatioBar() {
    return (
      <div className="row">
        <div className="col-md-6">
          <h6 className="float-right">Gender Ratio:</h6>
        </div>
        <div className="col-md-6">
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{
                width: `${this.state.genderRatioFemale}%`,
                backgroundColor: "pink"
              }}
              aria-valuenow="15"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <small>{this.state.genderRatioFemale}</small>
            </div>
            <div
              className="progress-bar"
              role="progressbar"
              style={{
                width: `${this.state.genderRatioMale}%`,
                backgroundColor: "blue"
              }}
              aria-valuenow="30"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <small>{this.state.genderRatioMale}</small>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="col">
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-5">
                <h5>
                  <b>{this.state.pokemonIndex}</b>
                </h5>
              </div>
              <div className="col-7">
                <div className="float-right">
                  {this.state.types.map(type => (
                    <span
                      key={type}
                      className="badge badge-primary badge-pill mr-1 text-capitalize"
                      style={{
                        backgroundColor: `#${TYPE_COLORS[type]}`,
                        color: "white"
                      }}
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-md-3">
                <img
                  src={this.state.imageUrl}
                  className="card-img-top rounded mx-auto mt-2"
                />
              </div>
              <div className="col-md-9">
                <h4 className="mx-auto text-capitalize">{this.state.name}</h4>
                {this.getStatBar("hp")}
                {this.getStatBar("attack")}
                {this.getStatBar("defense")}
                {this.getStatBar("speed")}
                {this.getStatBar("specialAttack")}
                {this.getStatBar("specialDefense")}
              </div>
            </div>
            <div className="row mt-1">
              <div className="p-2 mr-2">{this.state.description}</div>
            </div>
          </div>
          <hr />
          <div className="card-body">
            <h5 className="card-title text-center">Profile</h5>
            <div className="row">
              <div className="col-md-6">
                {this.getPokemonAttribute("height", "m")}
                {this.getPokemonAttribute("weight", "kg")}
                {this.getPokemonAttribute("catchRate", "%")}
                {this.getGenderRatioBar()}
              </div>
              <div className="col-md-6">
                {this.getPokemonAttribute("eggGroups")}
                {this.getPokemonAttribute("hatchSteps")}
                {this.getPokemonAttribute("evs")}
                {this.getPokemonAttribute("abilities")}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Pokemon;
