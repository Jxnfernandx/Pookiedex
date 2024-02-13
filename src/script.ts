const container = document.getElementById("pokedex-container") as HTMLElement;

// Global Pokemon list for better encapsulation
const pokedex: Pokemon[] = [];

const pageSize = 21; // Number of Pokemon to fetch per page
let currentPage = 1; // Current page index

// Pokemon class with more descriptive and consistent property names
class Pokemon {
  id: number;
  spriteUrl: string; // Renamed for clarity
  name: string;

  constructor(id: number, spriteUrl: string, name: string) {
    this.id = id;
    this.spriteUrl = spriteUrl;
    this.name = name;
  }
}

async function fetchPokemonData(page: number = 1): Promise<void> {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize - 1;

  for (let i = startIndex; i <= endIndex; i++) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}/`); // 1-based indexing
      const data = await response.json();
      const pokemon = new Pokemon(
        data.id,
        data.sprites.other.showdown.front_default, // Correct property for sprite URL
        data.name
      );
      pokedex.push(pokemon);
    } catch (error) {
      console.error(`Error fetching Pokémon ${i + 1}:`, error);
    }
  }
}

function renderPokemon(pokemonList: Pokemon[]) {
  container.innerHTML = ""; // Clear existing content

  pokemonList.forEach((pokemon) => {
    const card = document.createElement("div");
    card.classList.add("pokemon-card");

    const idElement = document.createElement("p");
    idElement.textContent = ` # ${pokemon.id}`;
    card.appendChild(idElement);

    const img = document.createElement("img");
    img.src = pokemon.spriteUrl; // Use the correct property
    card.appendChild(img);

    const name = document.createElement("p");
    name.textContent = pokemon.name;
    card.appendChild(name);

    container.appendChild(card);
  });
}

fetchPokemonData().then(() => renderPokemon(pokedex));

