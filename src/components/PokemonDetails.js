import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './PokemonDetails.css';

export function roundDownToNearestTen(number) {
    return Math.floor(number / 10) * 10;
}

function PokemonDetail() {
    let { id: urlId } = useParams();
    urlId = parseInt(urlId)
    const formattedId = isNaN(urlId) ? 1 : urlId
    const [id, setId] = useState(formattedId)
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        async function fetchPokemonDetails() {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
                setPokemon(response.data);
            } catch (error) {
                console.error('Error fetching Pokemon details:', error);
            }
        }
        fetchPokemonDetails();
    }, [id]);

    const handlePrev = () => {
        const prevPokemonId = pokemon.id - 1;
        setId(prevPokemonId)
        // window.location.href = `/pokemon/${prevPokemonId}`;
    };

    const handleNext = () => {
        const nextPokemonId = pokemon.id + 1;
        setId(nextPokemonId)
        // window.location.href = `/pokemon/${nextPokemonId}`;
    };

    const handleBack = () => {
        const roundedId = roundDownToNearestTen(id)
        window.location.href = `/pokedex/?offset=${roundedId}`;
    };




    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    if (!pokemon) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="pokemon-detail">
            <div className="header">
                <h2 className="pokemon-name">{capitalizeFirstLetter(pokemon.name)}</h2>
            </div>
            <div className="content">
                <div className="pokemon-image-container">
                    <img className="pokemon-image" src={pokemon.sprites.front_default} alt={pokemon.name}/>
                    <button className="prev-button" onClick={handlePrev} disabled={pokemon.id === 1}>Previous</button>
                    <button className="back-button" onClick={handleBack}>Back</button>
                    <button className="next-button" onClick={handleNext} disabled={pokemon.id === 1025}>Next</button>
                </div>
                <div className="pokemon-info">
                    <h3>ID: {pokemon.id}</h3>
                    <p>Height: {pokemon.height}</p>
                    <p>Weight: {pokemon.weight}</p>
                    <h3>Abilities:</h3>
                    <ul className="pokemon-abilities">
                    {pokemon.abilities.map((ability, index) => (
                            <li key={index}>{capitalizeFirstLetter(ability.ability.name)}</li>
                        ))}
                    </ul>
                    <h3>Types:</h3>
                    <ul className="pokemon-types">
                        {pokemon.types.map((type, index) => (
                            <li key={index}>{capitalizeFirstLetter(type.type.name)}</li>
                        ))}
                    </ul>
                    <h3>Stats:</h3>
                    <ul className="pokemon-stats">
                        {pokemon.stats.map((stat, index) => (
                            <li key={index}>
                                {capitalizeFirstLetter(stat.stat.name)}: {stat.base_stat}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </div>
    );
}

export default PokemonDetail;
