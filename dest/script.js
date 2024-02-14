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
const pokemonArray = [];
class Pokemon {
    constructor(id, spriteUrl, name) {
        this.id = id;
        this.spriteUrl = spriteUrl;
        this.name = name;
    }
}
function getPokemonData(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const data = yield response.json();
            const pokemon = new Pokemon(data.id, data.sprites.other.showdown.front_default, // Correct property for sprite URL
            data.name);
            pokemonArray.push(pokemon);
        }
        catch (error) {
            console.error(`error`, error);
        }
    });
}
function storingArray() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 1; i <= 21; i++) {
            yield getPokemonData(i);
        }
        console.log(pokemonArray);
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
storingArray().then(() => renderPokemon(pokemonArray));
