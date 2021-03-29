import React, { useState } from "react";
import API from "./API";

const PokeSearch = () => {
  const [formObject, setFormObject] = useState({});
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }
  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.pokeName) {
      API.pokeSearch({
        pokemon: formObject.pokeName,
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  }
  return (
    <form>
      <input
        onChange={handleInputChange}
        name="pokeName"
        placeholder="Search for a Pokemon . . ."
      />
      <button onClick={handleFormSubmit}>Get Pokemon</button>
    </form>
  );
};

export default PokeSearch;
