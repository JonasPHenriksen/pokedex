// About.js
import React from 'react';

function About() {
    return (
        <div>
            <h1>About</h1>
            <p>This is a Pokédex application built using React.</p>
            <button className="back-button" onClick={handleBack}>Back</button>
        </div>
    )
        ;
}

const handleBack = () => {
    window.history.back();
};

export default About;
