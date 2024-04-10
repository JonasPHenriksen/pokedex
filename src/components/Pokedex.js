import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Pokedex.css'; // Import CSS file for styling

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function Pokedex() {
    const [pokemonList, setPokemonList] = useState([]);
    const [offset, setOffset] = useState(0);
    const query = useQuery();
    const navigate = useNavigate(); // Import useNavigate
    const limit = 10;

    useEffect(() => {
        const offsetFromUrl = parseInt(query.get('offset'));
        if (!isNaN(offsetFromUrl)) {
            setOffset(offsetFromUrl);
        }
    }, [query]);

    useEffect(() => {
        async function fetchPokemon() {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
                setPokemonList(response.data.results);
            } catch (error) {
                console.error('Error fetching Pokemon:', error);
            }
        }
        fetchPokemon();
    }, [offset, limit]);

    const handleNext = () => {
        const newOffset = offset + limit;
        setOffset(newOffset);
        // Update URL with new offset
        navigate(`/pokedex/?offset=${newOffset}`);
    };

    const handlePrev = () => {
        const newOffset = Math.max(0, offset - limit);
        setOffset(newOffset);
        // Update URL with new offset
        navigate(`/pokedex/?offset=${newOffset}`);
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
                <button onClick={handleNext} disabled={offset === 1020} className="pagination-button">Next</button>
            </div>
            <div className="about-link">
                <Link to="/about">About This Page</Link>
            </div>
        </div>
    );
}

export default Pokedex;
