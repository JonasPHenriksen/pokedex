// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Pokedex from './components/Pokedex';
import About from './components/About';
import PokemonDetail from "./components/PokemonDetails";

function App() {
    // Set basename manually based on whether it's deployed on GitHub Pages or not
    const basename = window.location.pathname.startsWith('/pokedex') ? '/pokedex' : '/';

    return (
        <Router basename={basename}>
            <div>
                <Routes>
                    <Route path="/about" element={<About />} />
                    <Route path="/pokemon/:id" element={<PokemonDetail />} />
                    <Route path="/" element={<Pokedex />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
