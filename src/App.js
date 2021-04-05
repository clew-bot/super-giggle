import "./App.css";
import PokemonList from "./components/Pokemonlist";
import React, { useState, useEffect } from "react";
import API from "./components/API";
import Paginations from "./components/Pagination";
import PokeSearch from "./components/PokeSearch";
import Pagination from "@material-ui/lab/Pagination";
function App() {
  const [detail, setDetail] = useState([]);
  const [showPokemon, setShowPokemon] = useState(false);
  const [sprites, setSprites] = useState("");
  const [ability, setAbility] = useState("");
  const [baseStat, setBaseStat] = useState();
  const [postsPerPage] = useState(15);
  const [pokemon, setPokemon] = useState([]);
  const [types, setTypes] = useState();

  //pagination//
  const [currentPage, setCurrentPage] = useState(5);

  //Get everything about the pokemon//
  async function getPokeDetails(x) {
    setShowPokemon(true);
    const detail = await API.getPokeDetails(x);
    setDetail(x);
    setSprites(detail.data.sprites);
    setAbility(detail.data.abilities);
    // console.log(detail.data.types);
    setTypes(detail.data.types);

    setBaseStat(detail.data.stats);
  }

  useEffect(() => {
    const fetchPokemon = async () => {
      const res = await API.getMorePokemon();
      // console.log(res.data.results);
      setPokemon(res.data.results);
    };
    fetchPokemon();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage; //10
  const indexOfFirstPost = indexOfLastPost - postsPerPage; //0
  const currentPosts = pokemon.slice(indexOfFirstPost, indexOfLastPost);
  // console.log(currentPosts);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
      <PokeSearch getPokemon={getPokeDetails} style />

      <div style={{ display: "flex", flexDirection: "row-reverse" }}>
        <ul>
          {currentPosts.map((post) => (
            <li
              // href="/#"
              posts={currentPosts}
              onClick={() => {
                getPokeDetails(post.name);
                setDetail(
                  post.name.charAt(0).toUpperCase() + post.name.slice(1)
                );
              }}
              key={post.name}
              className="list-group-item"
            >
              {post.name.charAt(0).toUpperCase() + post.name.slice(1)}
            </li>
          ))}

          <Paginations
            paginate={paginate}
            totalPosts={pokemon.length}
            postsPerPage={postsPerPage}
          />
        </ul>

        <div>
          {showPokemon ? (
            <>
              <PokemonList
                sprite={sprites}
                pokename={detail}
                ability={ability}
                baseStat={baseStat}
                poketype={types}
              />
              {/* <img alt="pokemon" src={sprites} /> */}
            </>
          ) : (
            <h1>Click a Pokemon for more Details</h1>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
