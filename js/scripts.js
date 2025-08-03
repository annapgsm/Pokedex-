// Create a variable (pokemonRepository) to hold the IIFE result
let pokemonRepository = (function () {
  // Private array inside the IIFE
  // Create a new variable (pokemonList) 
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // Public function: adds a new Pokemon to the list (with validation)
  const expectedKeys = ['name', 'height', 'types', 'speed', 'catchRate'];

  // Public function to add a new Pokemon
  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon /* &&
      "detailsULR" in pokemon */
    ) {
      pokemonList.push(pokemon); //
    } else {
      console.log("pokemon is not correct");
    }
  }

  // Public function: returns the full list of Pokémon
  function getAll() {
    return pokemonList;
  }

  // Public function to search by name (exact match or partial)
  function filterByName(searchTerm) {
    // Removes any extra spaces from the beginning and end of input
    // then converts it to lowercase for case-insensitive comparison
    let cleanTerm = searchTerm.trim().toLowerCase();

    // Filters the pokemonList array: keeps only the Pokemon whose name
    // (converted to lowercase) includes the cleaned search term
    return pokemonList.filter(function (pokemon) {
      return pokemon.name.toLowerCase().includes(cleanTerm);
    });
  }

  // Public function: adds a list item and button to the HTML for each Pokemon
  function addListItem(pokemon){
    let pokemonList = document.querySelector(".pokemon-list"); // Selects the HTML element with class "pokemon-list" (parent container in the DOM)
    let listpokemon = document.createElement("li");
    let button = document.createElement("button"); // Creates a new list item and button
    button.innerText = pokemon.name; // Sets the button text to the Pokemon's name
    button.classList.add("button-class");  // Adds a class to the button for styling
    listpokemon.appendChild(button); // Adds (appends) the button to the list item
    pokemonList.appendChild(listpokemon); // and the list item to the list in the page

    addClickListener(button,pokemon); //Calls new function to add click listener
  }

  //Function to add event listener to a button
  function addClickListener(button, pokemon){
    button.addEventListener("click",function (){
      showDetails(pokemon)
    });
  }

  function loadList() {
    showLoadingMessage(); // Shows loading message first
    return fetch(apiUrl).then(function (response) { // Calls the fetch function to get data from the apiUrl (list of Pokemon)
      return response.json();  // When the response is received, parse it as JSON
    }).then(function (json) {
      json.results.forEach(function (item) { // Once the JSON is ready, go through each result in the 'results' array
        let pokemon = { // Creates a new Pokémon object with name and detailsUrl
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon); // Adds the Pokémon object to the repository
        console.log(pokemon);
      });
    }).catch(function (e) { // If an error happens anywhere in this chain, log it
      hideLoadingMessage(); // Hides message if an error occurs
      console.error(e);
    })
  }

  function loadDetails(item) {
    showLoadingMessage(); // Shows loading message first
    let url = item.detailsUrl; // Gets the URL for the individual Pokemon details
    return fetch(url).then(function (response) {  // Fetches data from that URL
      return response.json(); // Parses the response as JSON
    }).then(function (details) {
      hideLoadingMessage(); // Hides message after success
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default; // Image of Pokemon  
      item.height = details.height;                  // Height
      item.types = details.types;                    // Types Array
    }).catch(function (e) {
      hideLoadingMessage(); // Hides message if an error occurs
      console.error(e); // If there's an error fetching or parsing, logs it
    });
  }

 function showDetails(item) {
  // Load details from API (or wherever)
  pokemonRepository.loadDetails(item).then(function () {
    // After details are loaded, open the modal with Pokémon info
    let modalContent = `
      <img src="${item.imageUrl}" alt="${item.name}" style="width:150px; height:auto;">
      <p>Height: ${item.height} dm</p>
    `;
    showModal(item.name, modalContent);
  });
  }

  // Modal Function with title and content text
  function showModal(title, content) { 
    let modalContainer = document.querySelector('#modal-container'); // Selects modal container element
    modalContainer.innerHTML = ''; // Clears existing content

    let modal = document.createElement('div'); // Creates a new div for modal
    modal.classList.add('modal'); // Adds CSS class 'modal' 

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = title;

    let contentElement = document.createElement('div');
    contentElement.innerHTML = content; // Allow HTML

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');

    modalContainer.addEventListener('click',(e) => {
      let target = e.target;
      if (target===modalContainer){
        hideModal();
      }
    });
  }

  function hideModal(){
    let modalContainer=document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible')
  }

  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();  
    }
  });


  // Loading Message Function
  function showLoadingMessage() {
    let loadingMessage = document.createElement('p'); // Creates a paragraph element
    loadingMessage.innerText = 'Loading...'; // Sets the text
    loadingMessage.classList.add('loading-message'); // Adds a class for easy styling/selection
    document.body.appendChild(loadingMessage); // Appends it to the body
  }

  function hideLoadingMessage() {
    let loadingMessage = document.querySelector('.loading-message'); // Selects the loading message
    if (loadingMessage) {
      loadingMessage.remove(); // Removes it if it exists
    }
  }

  // Returns an object that exposes only the public functions
  return {
    getAll,
    add,
    filterByName,
    addListItem,
    loadList,
    loadDetails,
    showDetails
  };

})(); // <-- IIFE ends and runs immediately

/*  WHATS DOES THIS DO/ WHERE DOES IT GO? 
document.addEventListener('DOMContentLoaded', function () {
  let container = document.querySelector('#image-container'); // Finds the container by ID

  let myImage = document.createElement('img'); // Creates an <img> element
  myImage.src = 'https://picsum.photos/300/300'; // Sets the image source

  container.appendChild(myImage); // Adds the image to the container
}); */


// Adds a new Pokemon to test the add function
/* pokemonRepository.add({
  name: 'Onix',
  height: 8.8,
  types: ['rock', 'ground'],
  speed: 70,
  catchRate: 45
}); */

/* // Use the public method 'getAll' to get all Pokemon and print each one to the page
// Uses forEach() instead of a for loop
pokemonRepository.getAll().forEach(function (pokemon) {
  // For each Pokemon, create a button on the page
  pokemonRepository.addListItem(pokemon);



  // Build a string with the Pokemon’s name and height
  let displayText = pokemon.name + ' (height: ' + pokemon.height + ')';

  // Add a comment if the Pokemon is tall
  if (pokemon.height > 0.6) {
    displayText += " - Wow, that's big!";
  }

  // Write the string to the HTML document followed by a line break
  document.write(displayText + '<br>'); 
}); 
*/

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {  // Uses the public method 'getAll' to get all Pokemon and print each one to the page and Uses forEach() instead of a for loop
    pokemonRepository.addListItem(pokemon); // For each Pokemon, creates a button on the page
  });
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

