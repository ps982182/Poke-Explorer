import React from 'react';

function PokemonCard({ pokemon }) {
  return (
    <div className="pokemon-card">
      <img src={pokemon.image} alt={pokemon.name} />
      <h3>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
      <p>ID: {pokemon.id}</p>
      <p>Type: {pokemon.types.join(', ')}</p>
    </div>
  );
}

export default PokemonCard;
