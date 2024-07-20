import React from 'react';

const LandingPage: React.FC =() => {
    localStorage.setItem('prevPage', '/');

    const headingStyles = {
        margin: '5px',
        height: '40px'
    }
    return (
        <h1 style={headingStyles}>
            Welcome To My Fun!
        </h1>
    )
}

export { LandingPage };