// Create a variable (pokemonRepository) to hold the IIFE result
let pokemonRepository = (function () {
  // Private array inside the IIFE
  // Create a new variable (pokemonList) 
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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
    listpokemon.classList.add("list-group-item"); // NEW Bootstrap list style

    // Creates a button element for Pokemon
    let button = document.createElement("button"); // Creates a new list item and button
    button.innerText = pokemon.name; // Sets the button text to the Pokemon's name
    button.classList.add("btn", "btn-light", "btn-block", "text-capitalize");  // Adds a Bootstrap class to the button for styling

    // Add Bootstrap modal attributes to trigger the modal on click
    button.setAttribute("data-toggle", "modal");      // Enables modal toggle
    button.setAttribute("data-target", "#pokemonModal"); // Targets the modal by its ID

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
  return fetch(url) // Fetches data from that URL
    .then(response => response.json()) // Parses the response as JSON
    .then(details => {
      hideLoadingMessage();  // Hides message after success
      item.imageUrl = details.sprites.front_default; // Image of Pokemon  
      item.height = details.height;
      item.weight = details.weight; 
      item.types = details.types;
    })
    .catch(e => {
      hideLoadingMessage();
      console.error(e);
    });
  }


 function showDetails(item) {
  // Load details from API (or wherever)
  pokemonRepository.loadDetails(item).then(function () {
    // SHow modal with item
    showModal(item);// Pass the full item with details
  });
  }
  // Modal Function with title and content text
  function showModal (item) {
    // Creates variables:
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalHeader = $(".modal-header");
    
    //Clears existing content of the model
    modalTitle.empty();
    modalBody.empty();

    // Creates element for name in modal content
    let nameElement = $("<h5>").text(item.name);
    // creates img in modal content
    let imageElementFront = $('<img class="modal-img mb-3" style="width:50%"/>');
    imageElementFront.attr("src", item.imageUrl);
    // creates element for height, weight and types in modal content
    let heightElement = $("<p>").text("Height: " + item.height);
    let weightElement = $("<p>").text("Weight: " + item.weight);
    let types = item.types.map(t => t.type.name).join(", "); // etracts each type's name into an array
    let typesElement = $("<p>").html("Types: " + types);

    modalTitle.append(nameElement); // Appends the name to the modal title
    modalBody.append(imageElementFront);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);


    // Show the modal 
    $('#pokemonModal').modal('show');
  }
  
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


pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {  // Uses the public method 'getAll' to get all Pokemon and print each one to the page and Uses forEach() instead of a for loop
    pokemonRepository.addListItem(pokemon); // For each Pokemon, creates a button on the page
  });
});

