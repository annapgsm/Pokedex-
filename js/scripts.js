// Create a new variable (pokemonList) and assign a blank array to it
let pokemonList = [];

// Add several Pokémon objects to the array
pokemonList = [
  {
    name: 'Bulbasaur',
    height: 0.7,
    types: ['grass', 'poison'],
    speed: 45,
    catchRate: 45
  },
  {
    name: 'Charmander',
    height: 0.6,
    types: ['fire'],
    speed: 65,
    catchRate: 45
  },
  {
    name: 'Squirtle',
    height: 0.5,
    types: ['water'],
    speed: 43,
    catchRate: 45
  },
  {
    name: 'Turtwig',
    height: 0.4,
    types: ['grass'],
    speed: 31,
    catchRate: 45
  },
  {
    name: 'Pikachu',
    height: 0.4,
    types: ['electric'],
    speed: 90,
    catchRate: 190
  }
];

// Start a loop that goes through each item in the pokemonList array
for (let i = 0; i < pokemonList.length; i++) {

  // Stores the current Pokémon object in a variable
  let pokemon = pokemonList[i];

  // Creates a string that combines the name and height
  let displayText = pokemon.name + " (height: " + pokemon.height + ")";

  // Checks if the Pokémon is tall (height greater than 0.6)
  if (pokemon.height > 0.6) {
    // If so, adds a special message to the string
    displayText += " - Wow, that's big!";
  }

  // Write the final string to the web page and add a line break
  document.write(displayText + "<br>");
}

