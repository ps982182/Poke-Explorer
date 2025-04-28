import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from '../components/PokemonCard';
import SearchBar from '../components/SearchBar';
import FilterDropdown from '../components/FilterDropdown';

function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150');
        const results = response.data.results;

        // Fetch details for each Pokémon
        const pokemonData = await Promise.all(
          results.map(async (pokemon) => {
            const res = await axios.get(pokemon.url);
            return {
              id: res.data.id,
              name: res.data.name,
              image: res.data.sprites.front_default,
              types: res.data.types.map(t => t.type.name),
            };
          })
        );

        setPokemonList(pokemonData);
        setFilteredPokemon(pokemonData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch Pokémon data.');
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  useEffect(() => {
    let filtered = pokemonList.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedType) {
      filtered = filtered.filter(pokemon => 
        pokemon.types.includes(selectedType.toLowerCase())
      );
    }

    setFilteredPokemon(filtered);
  }, [searchTerm, selectedType, pokemonList]);

  if (loading) return <h2>Loading Pokémon...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className="home-container">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <FilterDropdown selectedType={selectedType} setSelectedType={setSelectedType} />
      <div className="pokemon-grid">
        {filteredPokemon.length > 0 ? (
          filteredPokemon.map(pokemon => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))
        ) : (
          <h3>No Pokémon found.</h3>
        )}
      </div>
    </div>
  );
}

export default Home;
