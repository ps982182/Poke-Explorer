import React from 'react';

const types = [
  '', 'fire', 'water', 'grass', 'electric', 'poison', 'flying', 'bug', 'normal', 
  'ground', 'fairy', 'fighting', 'psychic', 'rock', 'ghost', 'ice', 'dragon'
];

function FilterDropdown({ selectedType, setSelectedType }) {
  return (
    <select
      value={selectedType}
      onChange={(e) => setSelectedType(e.target.value)}
      className="filter-dropdown"
    >
      <option value="">All Types</option>
      {types.map(type => (
        <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
      ))}
    </select>
  );
}

export default FilterDropdown;
