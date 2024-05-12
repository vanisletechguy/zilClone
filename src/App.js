import React, { useState } from 'react';
import Home from './components/Home';
import ViewPosts from './components/ViewPosts';
import NavBar from './components/NavBar.js';
import GoogleMapsComponent from './components/Maps.js';

function App() {

    const [view, setView] = useState('welcome');

    const renderView = () => {
        switch (view) {
            case 'welcome':
                return <Home />;
            case 'listings':
                return <ViewPosts />;
            default:
                return <Home />;
        }
    };

    return (
        <div>
            <NavBar />
            {renderView()}
            <GoogleMapsComponent />
        </div>

    );
}

export default App;
