import React from "react";

const PokemonOrder = ({ pokemon }) => {
  return (
    <a href="/#" className="list-group mb-4 text-center">
      {pokemon.map((post) => (
        <p href="/#" key={post.name} className="list-group-item">
          {post.name.charAt(0).toUpperCase() + post.name.slice(1)}ddasdsad
        </p>
      ))}
    </a>
  );
};
export default PokemonOrder;
