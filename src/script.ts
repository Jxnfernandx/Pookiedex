const container = document.getElementById("pokedex-container") as HTMLElement;

const pokemonArray: Pokemon[] = [];

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

async function getPokemonData(id: number) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    const pokemon = new Pokemon(
      data.id,
      data.sprites.other.showdown.front_default, // Correct property for sprite URL
      data.name
    );
    pokemonArray.push(pokemon);
  } catch (error) {
    console.error(`error`, error);
  }
}

async function storingArray() {
  for(let i: number = 1; i <= 21; i++) {
    await getPokemonData(i);
  }
  console.log(pokemonArray);
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

storingArray().then(() => renderPokemon(pokemonArray));