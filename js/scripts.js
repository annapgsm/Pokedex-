// Create a variable (pokemonRepository) to hold the IIFE result
let pokemonRepository = (function () {
  // Private array inside the IIFE
  // Create a new variable (pokemonList) 
  let pokemonList = [
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

  // Public function: adds a new Pokemon to the list (with validation)
  const expectedKeys = ['name', 'height', 'types', 'speed', 'catchRate'];

  // Public function to add a new Pokemon
  function add(pokemon) {
    // Check if it's an object
    if (typeof pokemon !== 'object') {
      console.log('Invalid Pokémon: Not an object');
      return;
    }

    // Check if all expected keys match exactly
    let objectKeys = Object.keys(pokemon);
    let hasValidKeys =
      objectKeys.length === expectedKeys.length &&
      expectedKeys.every(key => objectKeys.includes(key));

    if (!hasValidKeys) {
      console.log('Invalid Pokémon: Keys do not match expected format');
      return;
    }

    // If everything is valid, add to list
    pokemonList.push(pokemon);
  }

  // Public function: returns the full list of Pokémon
  function getAll() {
    return pokemonList;
  }

  // NEW: Public function to search by name (exact match or partial)
  function filterByName(searchTerm) {
    return pokemonList.filter(function (pokemon) {
      return pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }

  // Public function: adds a list item and button to the HTML for each Pokemon
  function addListItem(pokemon){
    // Selects the HTML element with class "pokemon-list" (parent container in the DOM)
    let pokemonList = document.querySelector(".pokemon-list");
    // Creates a new list item and button
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    // Sets the button text to the Pokemon's name
    button.innerText = pokemon.name;
    // Adds a class to the button for styling
    button.classList.add("button-class");

    // Adds (appends) the button to the list item- and the list item to the list in the page
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);

    //Calls new function to add click listener
    addClickListener(button,pokemon);
  }

  // Function to show Pokemon details
  function showDetails(pokemon){
    // Prints the full Pokemon object to the console
    console.log(pokemon);
  }

  //New function to add event listener to a button
  function addClickListener(button, pokemon){
    button.addEventListener("click",function (){
      showDetails(pokemon)
    });
  }

  // Returns an object that exposes only the public functions
  return {
    getAll,
    add,
    filterByName,
    addListItem
  };

})(); // <-- IIFE ends and runs immediately

// Adds a new Pokemon to test the add function
pokemonRepository.add({
  name: 'Onix',
  height: 8.8,
  types: ['rock', 'ground'],
  speed: 70,
  catchRate: 45
});

// Use the public method 'getAll' to get all Pokemon and print each one to the page
// Uses forEach() instead of a for loop
pokemonRepository.getAll().forEach(function (pokemon) {
  // For each Pokemon, create a button on the page
  pokemonRepository.addListItem(pokemon);

/*  // Build a string with the Pokemon’s name and height
  let displayText = pokemon.name + ' (height: ' + pokemon.height + ')';

  // Add a comment if the Pokemon is tall
  if (pokemon.height > 0.6) {
    displayText += " - Wow, that's big!";
  }

  // Write the string to the HTML document followed by a line break
  document.write(displayText + '<br>'); */
});


/* for loop:
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
*/

