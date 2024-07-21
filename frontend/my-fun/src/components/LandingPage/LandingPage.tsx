import React from 'react';


interface LandingPageProps {

}

const LandingPage: React.FC =() => {
    localStorage.setItem('prevPage', '/');

    const headingStyles = {
        margin: '5px',
        height: '40px',
        fontFamily: 'URW Chancery L, cursive',
        color: '#084d96'
    }
    return (
        <h1 style={headingStyles}>
            Home
        </h1>
    )
}

export { LandingPage };