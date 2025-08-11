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
      col.classList.add("col-md-3", "mb-4", "d-flex", "justify-content-center");

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

