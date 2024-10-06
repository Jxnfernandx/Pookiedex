import {useState, useEffect} from "react";
import {URL} from "../assets/links.ts"
import Card from "./Card.tsx";
import {Pokemon} from "../assets/types";

function PopulateUI() {
    const [pokemon, setPokemon] = useState<Pokemon[]>([]); // Define correct state type for Pokémon data

    useEffect(() => {
        fetchInfo(URL); // Replace 'URL' with your actual API endpoint
    }, []);

    async function fetchInfo(url: string) {
        try {
            const response = await fetch(url);
            const result = await response.json();

            // Fetch details for each Pokémon
            const detailedData = await Promise.all(
                result.results.map(async (item: { url: string }): Promise<Pokemon> => {
                    const itemResponse = await fetch(item.url);
                    return await itemResponse.json(); // Assuming the response is a Pokémon object
                })
            );

            setPokemon(detailedData); // Update state with fetched Pokémon data
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <>
            <div className="populateui">
                {pokemon.length > 0 ? (
                pokemon.map((poke, index) => (
                    <Card key={index} image={poke.sprites.front_default} />
                ))
            ) : (
                <p>Loading...</p>
            )}
            </div>
        </>
    );
}

export default PopulateUI;