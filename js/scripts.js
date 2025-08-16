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

  function addListItem(pokemon) {
  let pokemonList = document.querySelector(".pokemon-list"); // main row container

    // First, load Pokémon details (this gets imageUrl)
    loadDetails(pokemon).then(function () {
      // Create Bootstrap column
      let col = document.createElement("div");
      col.classList.add("col-md-2", "mb-4", "d-flex", "justify-content-center");

      // Create card container
      let card = document.createElement("div");
      card.classList.add("card", "w-100", "text-center");

      // Card body for the name
      let cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      // Pokémon name as card title
      let title = document.createElement("h5");
      title.classList.add("card-title", "text-capitalize");
      title.innerText = pokemon.name;

      // Append title to the body
      cardBody.appendChild(title);

      // Pokémon image
      let img = document.createElement("img");
      img.classList.add("card-img-bottom", "img-fluid");
      img.alt = pokemon.name;
      img.src = pokemon.imageUrl; // now guaranteed to be set

      // Make the card clickable to open modal
      card.style.cursor = "pointer";
      card.addEventListener("click", function () {
        showDetails(pokemon);
      });

      // Assemble card
      card.appendChild(cardBody);
      card.appendChild(img);
      col.appendChild(card);

      // Add to container
      pokemonList.appendChild(col);
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
  // Set modal title text
  $('#pokemonModalLabel').text(item.name);

  // Set image
  $('#modal-image')
    .attr('src', item.imageUrl)
    .attr('alt', item.name);

  // Fill the other details
  $('#modal-height').text('Height: ' + item.height);
  $('#modal-weight').text('Weight: ' + item.weight);
  $('#modal-types').text(
    'Types: ' + item.types.map(t => t.type.name).join(', ')
  );

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
    showDetails,
    showLoadingMessage,
    hideLoadingMessage
  };

})(); // <-- IIFE ends and runs immediately


// Load and display all Pokémon initially
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
  pokemonRepository.hideLoadingMessage();
});

// Search functionality
$(document).ready(function () {
  $('#pokemon-search-form').on('submit', function (e) {
    e.preventDefault();
    console.log('Intercepted submit on #pokemon-search-form');

    let name = $('#pokemon-search-form input[type="search"]').val().toLowerCase();
    let filteredPokemon = pokemonRepository.filterByName(name);

    $('.pokemon-list').empty();
    filteredPokemon.forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });
});

// Show/hide "Scroll to Top" button
window.addEventListener('scroll', function() {
  const btn = document.getElementById('scrollToTopBtn');
  if (window.scrollY > 250) { // Show after 250px scroll
    btn.classList.add('show');
  } else {
    btn.classList.remove('show');
  }
});

// Scroll smoothly to top when the button is clicked
document.getElementById('scrollToTopBtn').addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
