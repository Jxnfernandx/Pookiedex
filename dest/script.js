"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const container = document.getElementById("pokedex-container");
// Global Pokemon list for better encapsulation
const pokedex = [];
const pageSize = 21; // Number of Pokemon to fetch per page
let currentPage = 1; // Current page index
// Pokemon class with more descriptive and consistent property names
class Pokemon {
    constructor(id, spriteUrl, name) {
        this.id = id;
        this.spriteUrl = spriteUrl;
        this.name = name;
    }
}
function fetchPokemonData(page = 1) {
    return __awaiter(this, void 0, void 0, function* () {
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize - 1;
        for (let i = startIndex; i <= endIndex; i++) {
            try {
                const response = yield fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}/`); // 1-based indexing
                const data = yield response.json();
                const pokemon = new Pokemon(data.id, data.sprites.other.showdown.front_default, // Correct property for sprite URL
                data.name);
                pokedex.push(pokemon);
            }
            catch (error) {
                console.error(`Error fetching Pokémon ${i + 1}:`, error);
            }
        }
    });
}
function renderPokemon(pokemonList) {
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
