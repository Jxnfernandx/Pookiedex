"use strict";
/* type objType = {
    objName: string;
    objInfoURL: string;
}

let objArray: Array<objType> = [];

const fetchPokemonArray = async () => {
   const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0");
   if (!response.ok) {
     throw new Error(response.statusText);
   }
   const data = await response.json();
   objArray = data.results.map((pokemon: any) => ({
     objName: pokemon.name,
     objInfoURL: pokemon.url
   }));
}

*/
/* class Pokemon {
    name: string;
    infoURL: string;
    id: number;
    imageURL: string;
    type: string[];
    stats: string[];

    constructor(name: string, infoURL: string, id: number, imageURL: string, type: string[], stats: string[]) {
        this.name = name;
        this.infoURL = infoURL;
        this.id = id;
        this.imageURL = imageURL;
        this.type = type;
        this.stats = stats;
    }
}


let pokedex: Array<Pokemon> = [];

const fetchPokemonArray = async () => {
    const response1 = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0");
    const data1 = await response1.json();
    pokedex = data1.results.map((data1: any) => ({
        name: data1.name,
        infoURL: data1.url
    }));
    
 }

 const logPokemon = async () => {
    await fetchPokemonArray();
    console.log(pokedex);
  }
  
  logPokemon();

const fetchPokemonInfo = async (id: number) => {
    const response2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    const data2 = await response2.json();
    pokedex = data2.

}

*/
const container = document.getElementById("pokedex-container");
const pokemonElement = document.createElement("img");
const pokedex = [];
let sampleSize = pokedex.length + 8;
class Pokemon {
    constructor(id, name, sprite) {
        this.id = id;
        this.name = name;
        this.sprite = sprite;
    }
}
const fetchPokemonData = () => {
    for (let i = 1; i <= 8; i++) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`)
            .then(response => response.json())
            .then((data) => {
            let pokemon = new Pokemon(data.id, data.name, data.sprites.front_default);
            pokedex.push(pokemon);
        });
    }
};
