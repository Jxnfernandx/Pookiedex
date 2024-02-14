const container = document.getElementById("pokedex-container") as HTMLElement;

const pageIndex: number = 21; //Pokemon per page 

let startIndex: number = 1;
let endIndex: number = 21;

const retrieveSize = (startIndex: number) => {
  endIndex = startIndex + 20;
};

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

async function storingArray(startIndex: number, endIndex: number) {
  for(let i: number = startIndex; i <= endIndex; i++) {
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

storingArray(startIndex, endIndex).then(() => renderPokemon(pokemonArray));

window.addEventListener('scroll',() => {
  if(window.scrollY + window.innerHeight >= document.documentElement.scrollHeight){
    startIndex += pageIndex;
    retrieveSize(startIndex);
    storingArray(startIndex, endIndex).then(() => renderPokemon(pokemonArray))
  }
})