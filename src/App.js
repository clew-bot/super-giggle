import "./App.css";
import PokemonList from "./components/Pokemonlist";
import React, { useState, useEffect } from "react";
import API from "./components/API";
import Paginations from "./components/Pagination";
import PokeSearch from "./components/PokeSearch";
import Grid from '@material-ui/core/Grid';

function App() {
  const [detail, setDetail] = useState([]);
  const [showPokemon, setShowPokemon] = useState(false);
  const [sprites, setSprites] = useState("");
  const [ability, setAbility] = useState("");
  const [baseStat, setBaseStat] = useState();
  const [postsPerPage] = useState(5);
  const [pokemon, setPokemon] = useState([]);
  
  const [types, setTypes] = useState();

  //pagination//
  const [currentPage, setCurrentPage] = useState(10);

  //Get everything about the pokemon//
  async function getPokeDetails(x) {
    try {
    setShowPokemon(true);
    const detail = await API.getPokeDetails(x);
    setDetail(x);
    setSprites(detail.data.sprites);
    
    setAbility(detail.data.abilities);
    setTypes(detail.data.types);
    setBaseStat(detail.data.stats);
    } catch {
    alert("hel")
    }
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
  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
      
    
      <div >
      <Grid item xs={12} lg={12}>
        <ul style={{display: "flex", justifyContent: "center", marginTop: "40px"}}>
    
      <Paginations
            paginate={paginate}
            totalPosts={pokemon.length}
            postsPerPage={postsPerPage}
            // currentPage={currentPage}
      />
     
        </ul>
        </Grid>
   
        <div>
        {currentPosts.map((post) => (
               <Grid item xs={12} lg={12}>
            <p
                style={{display: "flex", justifyContent: "center", marginTop: "10x"}}
                onClick={() => {
                getPokeDetails(post.name);
                setDetail(
                  post.name.charAt(0).toUpperCase() + post.name.slice(1)
                );
              }}
              key={post.name}
            >
              {post.name.charAt(0).toUpperCase() + post.name.slice(1)}
            </p>
            </Grid>
          ))}
          
          {showPokemon ? (
            <>
            <PokeSearch getPokemon={getPokeDetails} style />
              <PokemonList
                sprite={sprites}
                pokename={detail}
                ability={ability}
                baseStat={baseStat}
                poketype={types}
              />
            </>
          ) : (
            <>
            <iframe title="pokemon" src="https://giphy.com/embed/iBANmdIlMNJVC" width="480" height="100" frameBorder="0" allowFullScreen></iframe>
          </>)}
        </div>
     
      </div>
      
    </>
  );
}

export default App;
