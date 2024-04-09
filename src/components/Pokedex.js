import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import './Pokedex.css'; // Import CSS file for styling
import {roundDownToNearestTen} from "./PokemonDetails";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function Pokedex() {
    const query = useQuery();
    const offsetFromUrl = parseInt(query.get("offset"))
    const [pokemonList, setPokemonList] = useState([]);
    const [offset, setOffset] = useState(
        isNaN(offsetFromUrl) ? 0 : offsetFromUrl
    );
    const [count, setCount] = useState(0);
    const limit = 10;

    useEffect(() => {
        async function fetchPokemon() {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
                setPokemonList(response.data.results);
                setCount(response.data.count);
            } catch (error) {
                console.error('Error fetching Pokemon:', error);
            }
        }
        fetchPokemon();
    }, [offset]);


    const handleNext = () => {
        const newOffset = offset + limit;
        setOffset(newOffset);
    };

    const handlePrev = () => {
        const newOffset = Math.max(0, offset - limit);
        setOffset(newOffset);
    };


    return (
        <div className="pokedex-container">
            <h1 className="pokedex-title">Pokédex</h1>
            <ul className="pokemon-list">
                {pokemonList.map(pokemon => (
                    <li key={pokemon.name}>
                        <Link to={`/pokemon/${pokemon.url.split('/').slice(-2, -1)}`}>
                            <div className="pokemon-item">
                                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/').slice(-2, -1)}.png`} alt={pokemon.name} className="pokemon-image" />
                                <span className="pokemon-name">{capitalizeFirstLetter(pokemon.name)}</span>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
            <div className="pagination">
                <button onClick={handlePrev} disabled={offset === 0} className="pagination-button">Previous</button>
                <button onClick={handleNext} disabled={offset === roundDownToNearestTen(count)} className="pagination-button">Next</button>
            </div>
            <div className="about-link">
                <Link to="/about">About This Page</Link>
            </div>
        </div>
    );
}

export default Pokedex;
