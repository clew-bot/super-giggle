import "./App.css";
import PokemonList from "./components/Pokemonlist";
import React, { useState, useEffect } from "react";
import API from "./components/API";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [detail, setDetail] = useState([]);
  const [showPokemon, setShowPokemon] = useState(false);
  const [sprites, setSprites] = useState("");
  const [ability, setAbility] = useState("");
  const [baseStat, setBaseStat] = useState();

  async function getPokeDetails(x) {
    setShowPokemon(true);
    const detail = await API.getPokeDetails(x);
    console.log(detail.data.sprites);
    setSprites(detail.data.sprites);
    setAbility(detail.data.abilities);
    console.log(setAbility);
    setBaseStat(detail.data.stats);
    console.log(detail.data.stats);
  }

  useEffect(() => {
    const fetchPokemon = async () => {
      const res = await API.getPokemon();
      console.log(res.data.results);
      setPokemon(res.data.results);
    };
    fetchPokemon();
  }, []);

  return (
    <>
      <ul className="list-group mb-4 text-center">
        {pokemon.map((post) => (
          <p
            onClick={() => {
              getPokeDetails(post.name);
              setDetail(post.name.charAt(0).toUpperCase() + post.name.slice(1));
            }}
            key={post.name}
            className="list-group-item"
          >
            {post.name.charAt(0).toUpperCase() + post.name.slice(1)}
          </p>
        ))}
      </ul>

      <div>
        {showPokemon ? (
          <>
            <PokemonList
              sprite={sprites}
              pokename={detail}
              ability={ability}
              baseStat={baseStat}
            />
            {/* <img alt="pokemon" src={sprites} /> */}
          </>
        ) : (
          <h1>Click a Pokemon for more Details</h1>
        )}
      </div>
    </>
  );
}

export default App;
