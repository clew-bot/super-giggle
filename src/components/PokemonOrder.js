import React from "react";

const PokemonOrder = ({ pokemon }) => {
  return (
    <ul className="list-group mb-4 text-center">
      {pokemon.map((post) => (
        <p key={post.name} className="list-group-item">
          {post.name.charAt(0).toUpperCase() + post.name.slice(1)}
        </p>
      ))}
    </ul>
  );
};
export default PokemonOrder;
