
# Pokémon Repository 

A responsive, interactive Pokémon index built with JavaScript and Bootstrap 4 that fetches Pokémon data from the PokéAPI, displays it in cards, supports search functionality, and shows detailed info modals.


## Technologies used

Frontend
- HTML5 — Structuring the webpage and content.
- CSS3 & Bootstrap 4 — Styling and responsive design, including grid and component styles.
- JavaScript (ES6) — All interactivity, data fetching, rendering, and event handling.
- jQuery 3.3.1 — Simplified DOM manipulation and event handling.-
- Bootstrap Icons — For vector icons like the home icon in the navbar.
- Normalize.css — CSS reset to ensure consistent styling across browsers.

API & Data

- PokéAPI — Public RESTful API used for fetching Pokémon data such as names, images, heights, weights, and types.

Tools & Libraries
- Fetch API — To make HTTP requests to PokéAPI for data.
- Bootstrap JS Components (Modal, Navbar, Buttons) — Interactive UI elements.
## Features

- Pokémon Listing: Fetches and displays the first 150 Pokémon with images, names, height, weight, and types.
- Search: Filter Pokémon by name dynamically without page reload.
- Details Modal: Click on a Pokémon card to view detailed info in a Bootstrap modal.
- Responsive Layout: Uses Bootstrap’s grid system for consistent layout across devices.
- Loading Indicator: Shows a loading message while fetching data asynchronously.
- Custom UI Enhancements:
    - Styled Home button with a custom blue color and icon.
    - Navbar with drop shadow for a subtle elevation effect.
    - Search and Home buttons are styled with custom colors.
    - Type Color Badges on Pokémon Cards

         - **Single-type Pokémon:** The badge is a solid color matching that Pokémon’s type.
         - **Dual-type Pokémon:** The badge shows a left-to-right gradient split with the two respective colors side by side.

        The colors are mapped from predefined type-to-color values (such as Fire = #EE8130, Water = #6390F0, etc.), aligned with the Pokémon API type names.


## Set up instructions

Prerequisites
-Modern web browser (Chrome, Firefox, Edge, Safari)
-Internet connection to fetch data and load CDNs

git clone https://annapgsm.github.io/Pokedex-

cd portfolio-site

## Deployment

To deploy this project run:

```bash
  https://annapgsm.github.io/Pokedex-

