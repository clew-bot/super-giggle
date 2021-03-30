import React, { useState } from "react";
import API from "../components/API";
const AbilityDescription = ({ abilities, otherAbilz }) => {
  const [description, setDescription] = useState();
  console.log(otherAbilz);
  async function getAbilityDescription(abilities) {
    const res = await API.getAbility(abilities);
    console.log(res);
    setDescription(res.data.effect_entries[1].effect);
  }
  getAbilityDescription(abilities);
  return <h3>{description}</h3>;
};

export default AbilityDescription;
