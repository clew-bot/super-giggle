import "./App.css";
import PokemonList from "./components/Pokemonlist";
import React, { useState, useEffect } from "react";
import API from "./components/API";
import Pagination from "./components/Pagination";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [detail, setDetail] = useState([]);
  const [showPokemon, setShowPokemon] = useState(false);
  const [sprites, setSprites] = useState("");
  const [ability, setAbility] = useState("");
  const [baseStat, setBaseStat] = useState();
  const [postsPerPage] = useState(10);

  //pagination//
  const [currentPage, setCurrentPage] = useState(1);

  //Get everything about the pokemon//
  async function getPokeDetails(x) {
    setShowPokemon(true);
    const detail = await API.getPokeDetails(x);

    setSprites(detail.data.sprites);
    setAbility(detail.data.abilities);

    setBaseStat(detail.data.stats);
  }

  useEffect(() => {
    const fetchPokemon = async () => {
      const res = await API.getMorePokemon();
      console.log(res.data.results);
      setPokemon(res.data.results);
    };
    fetchPokemon();
  }, []);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = pokemon.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
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
        <Pagination
          paginate={paginate}
          totalPosts={pokemon.length}
          postsPerPage={postsPerPage}
        />
      </div>
    </>
  );
}

export default App;
