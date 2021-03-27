import "./App.css";
import PokemonList from "./components/Pokemonlist";
import React, { useState, useEffect } from "react";
import API from "./components/API";

function App() {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      const res = await API.getPokemon();
      console.log(res.data.results);
      setPokemon(res.data.results);
      console.log(setPokemon);
    };
    fetchPokemon();
  }, []);

  return (
    <ul className="list-group mb-4 text-center">
      {pokemon.map((post) => (
        <p key={post.name} className="list-group-item">
          {post.name.charAt(0).toUpperCase() + post.name.slice(1)}
        </p>
      ))}
    </ul>
  );
}

export default App;
