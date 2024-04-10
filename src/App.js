// App.js
import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Pokedex from './components/Pokedex';
import About from './components/About';
import PokemonDetail from "./components/PokemonDetails";

function App() {
    // Basename to work with github pages
    const basename = window.location.pathname.startsWith('/pokedex') ? '/pokedex' : '/';

    return (
        <Router>
            <div>
                <Routes>
                    <Route path={"/pokedex"} element={<Pokedex />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/pokemon/:id" element={<PokemonDetail />} />
                    <Route path="*" element={<Navigate to={"/pokedex"} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
