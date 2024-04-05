// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes instead of Route
import Pokedex from './components/Pokedex';
import About from './components/About';
import PokemonDetail from "./components/PokemonDetails";

function App() {
  return (
      <Router>
        <div>
          <Routes> {/* Wrap your Route components with Routes */}
            <Route path="/about" element={<About />} />
            <Route path="/pokemon/:id" element={<PokemonDetail />} />
            <Route path="/" element={<Pokedex />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
