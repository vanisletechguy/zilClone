/*

//import React, { useMemo } from 'react';
import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { GoogleMap, Marker, InfoWindowF } from '@react-google-maps/api';
import styles from './Maps.module.css'; // Import the CSS module

import { showListingDetails } from '../actions/listingsActions';
import { showListingDetailsPopup } from '../actions/popupActions';



const containerStyle = {
    width: '100%',
    height: '75vh'
};

const center = {
    lat: 48.115968,
    lng: -122.567368
};

// Function to create a custom marker icon with the price
const createPriceMarker = (price, isHovered) => {

    const fillColor = isHovered ? '#FF5733' : '#FF0000'; // Change color on hover
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="60">
            <rect x="10" y="0" width="80" height="40" rx="10" ry="10" fill="${fillColor}" stroke="#FFFFFF" stroke-width="2"/>
            <polygon points="50,60 40,40 60,40" fill="${fillColor}" stroke="#FFFFFF" stroke-width="2"/>
            <text x="50%" y="25" dominant-baseline="middle" text-anchor="middle" fill="#FFFFFF" font-size="16" font-weight="bold">$${price}</text>
        </svg>
    `;

    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};




const GoogleMapsComponent = () => {
    const dispatch = useDispatch();
    const listings = useSelector(state => state.listings.listings);
    const view = useSelector(state => state.view.currentView);
    const [markers, setMarkers] = useState([]);
    const [hoveredMarker, setHoveredMarker] = useState(null);
    const [selectedMarker, setSelectedMarker] = useState(null);

    useEffect(() => {
        if (view === 'listings') {
            const newMarkers = listings.map(listing => ({
                id: listing.id,
                position: {
                    lat: parseFloat(listing.latitude),
                    lng: parseFloat(listing.longitude),
                },
                price: listing.price,
                details: listing
            }));
            setMarkers(newMarkers);
        }
    }, [view, listings]);

    const handleMarkerHover = useCallback((markerId) => {
        setHoveredMarker(markerId);
    }, []);

    const handleMarkerClick = useCallback((marker) => {
        setSelectedMarker(marker);
    }, []);

    const handleInfoWindowClick = useCallback((event) => {
        event.stopPropagation();
        if (selectedMarker) {
            dispatch(showListingDetails(selectedMarker.details));
            dispatch(showListingDetailsPopup());
        }
    }, [selectedMarker, dispatch]);

    const handleInfoWindowClose = useCallback(() => {
        setSelectedMarker(null);
    }, []);


    return (
        <div style={{ flex: 4 }}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
            >
                {markers.map(marker => (
                    <Marker
                        key={marker.id}
                        position={marker.position}

                        icon={{
                            url: createPriceMarker(marker.price, marker.id === hoveredMarker),
                            scaledSize: new window.google.maps.Size(100, 60),
                            anchor: new window.google.maps.Point(50, 60),
                        }}
                        onMouseOver={() => handleMarkerHover(marker.id)}
                        onMouseOut={() => handleMarkerHover(null)}
                        onClick={() => handleMarkerClick(marker)}
                    />
                ))}
                {selectedMarker && (
                    <InfoWindowF
                        position={selectedMarker.position}
                        onCloseClick={handleInfoWindowClose}
                        options={{ disableAutoPan: true }}
                    >

                        <div className={styles.infoWindow} onClick={handleInfoWindowClick}>
                            <img src={`http://localhost:3131/${selectedMarker.details.image}`} alt="Listing" className={styles.image} />
                            <h3 className={styles.title}>{selectedMarker.details.address}</h3>
                            <p className={styles.text}>{selectedMarker.details.property_type}</p>
                            <p className={styles.text}>Price: ${selectedMarker.details.price}</p>
                            <p className={styles.text}>Bedrooms: {selectedMarker.details.bedrooms}</p>
                            <p className={styles.text}>Bathrooms: {selectedMarker.details.bathrooms}</p>
                            <p className={styles.text}>Area: {selectedMarker.details.area} Sq Ft</p>
                        </div>
                        
                    </InfoWindowF>
                )}
            </GoogleMap>
        </div>
    );
};

export default GoogleMapsComponent;


*/











/*


import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GoogleMap, Marker, InfoWindowF } from '@react-google-maps/api';
import styles from './Maps.module.css'; // Import the CSS module

import { showListingDetails } from '../actions/listingsActions';
import { showListingDetailsPopup } from '../actions/popupActions';

const containerStyle = {
    width: '100%',
    height: '75vh'
};

const center = {
    lat: 48.115968,
    lng: -122.567368
};

// Function to create a custom marker icon with the price
const createPriceMarker = (price, isHovered) => {
    const fillColor = isHovered ? '#FF5733' : '#FF0000'; // Change color on hover
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="60">
            <rect x="10" y="0" width="80" height="40" rx="10" ry="10" fill="${fillColor}" stroke="#FFFFFF" stroke-width="2"/>
            <polygon points="50,60 40,40 60,40" fill="${fillColor}" stroke="#FFFFFF" stroke-width="2"/>
            <text x="50%" y="25" dominant-baseline="middle" text-anchor="middle" fill="#FFFFFF" font-size="16" font-weight="bold">$${price}</text>
        </svg>
    `;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

const GoogleMapsComponent = () => {
    const dispatch = useDispatch();
    const listings = useSelector(state => state.listings.listings);
    const view = useSelector(state => state.view.currentView);
    const [markers, setMarkers] = useState([]);
    const [hoveredMarker, setHoveredMarker] = useState(null);
    const [selectedMarker, setSelectedMarker] = useState(null);

    useEffect(() => {
        if (view === 'listings') {
            const newMarkers = listings.map(listing => ({
                id: listing.listing_id,
                position: {
                    lat: parseFloat(listing.latitude),
                    lng: parseFloat(listing.longitude),
                },
                price: listing.price,
                details: listing
            }));
            setMarkers(newMarkers);
        }
    }, [view, listings]);

    const handleMarkerHover = useCallback((markerId) => {
        setHoveredMarker(markerId);
    }, []);

    const handleMarkerClick = useCallback((marker) => {
        setSelectedMarker(marker);
        console.log('Selected Marker Details:', marker.details); // Add console log
    }, []);

    const handleInfoWindowClick = useCallback((event) => {
        event.stopPropagation();
        if (selectedMarker) {
            dispatch(showListingDetails(selectedMarker.details));
            dispatch(showListingDetailsPopup());
        }
    }, [selectedMarker, dispatch]);

    const handleInfoWindowClose = useCallback(() => {
        setSelectedMarker(null);
    }, []);

    return (
        <div style={{ flex: 4 }}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
            >
                {markers.map(marker => (
                    <Marker
                        key={marker.id}
                        position={marker.position}
                        icon={{
                            url: createPriceMarker(marker.price, marker.id === hoveredMarker),
                            scaledSize: new window.google.maps.Size(100, 60),
                            anchor: new window.google.maps.Point(50, 60),
                        }}
                        onMouseOver={() => handleMarkerHover(marker.id)}
                        onMouseOut={() => handleMarkerHover(null)}
                        onClick={() => handleMarkerClick(marker)}
                    />
                ))}
                {selectedMarker && (
                    <InfoWindowF
                        position={selectedMarker.position}
                        onCloseClick={handleInfoWindowClose}
                        options={{ disableAutoPan: true }}
                    >
                        <div className={styles.infoWindow} onClick={handleInfoWindowClick}>
                            {selectedMarker.details.images && selectedMarker.details.images.length > 0 && (
                                <img
                                    src={`http://localhost:3131/${selectedMarker.details.images[0]}`}
                                    alt="Listing"
                                    className={styles.image}
                                />
                            )}
                            <h3 className={styles.title}>{selectedMarker.details.address}</h3>
                            <p className={styles.text}>{selectedMarker.details.property_type}</p>
                            <p className={styles.text}>Price: ${selectedMarker.details.price}</p>
                            <p className={styles.text}>Bedrooms: {selectedMarker.details.bedrooms}</p>
                            <p className={styles.text}>Bathrooms: {selectedMarker.details.bathrooms}</p>
                            <p className={styles.text}>Area: {selectedMarker.details.area} Sq Ft</p>
                        </div>
                    </InfoWindowF>
                )}
            </GoogleMap>
        </div>
    );
};

export default GoogleMapsComponent;





*/

















/*
import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GoogleMap, Marker, InfoWindowF } from '@react-google-maps/api';
import styles from './Maps.module.css';

import { showListingDetails } from '../actions/listingsActions';
import { showListingDetailsPopup } from '../actions/popupActions';

const containerStyle = {
    width: '100%',
    height: '75vh'
};

const center = {
    lat: 48.115968,
    lng: -122.567368
};

const createPriceMarker = (price, isHovered) => {
    const fillColor = isHovered ? '#FF5733' : '#FF0000';
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="60">
            <rect x="10" y="0" width="80" height="40" rx="10" ry="10" fill="${fillColor}" stroke="#FFFFFF" stroke-width="2"/>
            <polygon points="50,60 40,40 60,40" fill="${fillColor}" stroke="#FFFFFF" stroke-width="2"/>
            <text x="50%" y="25" dominant-baseline="middle" text-anchor="middle" fill="#FFFFFF" font-size="16" font-weight="bold">$${price}</text>
        </svg>
    `;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

const GoogleMapsComponent = () => {
    const dispatch = useDispatch();
    const listings = useSelector(state => state.listings.listings);
    const view = useSelector(state => state.view.currentView);
    const [markers, setMarkers] = useState([]);
    const [hoveredMarker, setHoveredMarker] = useState(null);
    const [selectedMarker, setSelectedMarker] = useState(null);

    useEffect(() => {
        if (view === 'listings') {
            const newMarkers = listings.map(listing => ({
                id: listing.listing_id,
                position: {
                    lat: parseFloat(listing.latitude),
                    lng: parseFloat(listing.longitude),
                },
                price: listing.price,
                details: listing
            }));
            setMarkers(newMarkers);
        }
    }, [view, listings]);

    const handleMarkerHover = useCallback((markerId) => {
        setHoveredMarker(markerId);
    }, []);

    const handleMarkerClick = useCallback((marker) => {
        setSelectedMarker(marker);
        console.log('Selected Marker Details:', marker.details); // Add console log
    }, []);

    const handleInfoWindowClick = useCallback((event) => {
        event.stopPropagation();
        if (selectedMarker) {
            dispatch(showListingDetails(selectedMarker.details));
            dispatch(showListingDetailsPopup());
        }
    }, [selectedMarker, dispatch]);

    const handleInfoWindowClose = useCallback(() => {
        setSelectedMarker(null);
    }, []);

    return (
        <div style={{ flex: 4 }}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
            >
                {markers.map(marker => (
                    <Marker
                        key={marker.id}
                        position={marker.position}
                        icon={{
                            url: createPriceMarker(marker.price, marker.id === hoveredMarker),
                            scaledSize: new window.google.maps.Size(100, 60),
                            anchor: new window.google.maps.Point(50, 60),
                        }}
                        onMouseOver={() => handleMarkerHover(marker.id)}
                        onMouseOut={() => handleMarkerHover(null)}
                        onClick={() => handleMarkerClick(marker)}
                    />
                ))}
                {selectedMarker && (
                    <InfoWindowF
                        position={selectedMarker.position}
                        onCloseClick={handleInfoWindowClose}
                        options={{ disableAutoPan: true }}
                    >
                        <div className={styles.infoWindow} onClick={handleInfoWindowClick}>
                            {selectedMarker.details.images && selectedMarker.details.images.length > 0 ? (
                                selectedMarker.details.images.split(',').map((image, index) => (
                                    <img
                                        key={index}
                                        src={`http://localhost:3131/${image}`}
                                        alt="Listing"
                                        className={styles.image}
                                    />
                                ))
                            ) : (
                                <p>No image available</p>
                            )}
                            <h3 className={styles.title}>{selectedMarker.details.address}</h3>
                            <p className={styles.text}>{selectedMarker.details.property_type}</p>
                            <p className={styles.text}>Price: ${selectedMarker.details.price}</p>
                            <p className={styles.text}>Bedrooms: {selectedMarker.details.bedrooms}</p>
                            <p className={styles.text}>Bathrooms: {selectedMarker.details.bathrooms}</p>
                            <p className={styles.text}>Area: {selectedMarker.details.area} Sq Ft</p>
                        </div>
                    </InfoWindowF>
                )}
            </GoogleMap>
        </div>
    );
};

export default GoogleMapsComponent;
*/









import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GoogleMap, Marker, InfoWindowF } from '@react-google-maps/api';
import Slider from 'react-slick';
import styles from './Maps.module.css';

import { showListingDetails } from '../actions/listingsActions';
import { showListingDetailsPopup } from '../actions/popupActions';

const containerStyle = {
    width: '100%',
    height: '75vh'
};

const center = {
    lat: 48.115968,
    lng: -122.567368
};

const createPriceMarker = (price, isHovered) => {
    const fillColor = isHovered ? '#FF5733' : '#FF0000';
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="60">
            <rect x="10" y="0" width="80" height="40" rx="10" ry="10" fill="${fillColor}" stroke="#FFFFFF" stroke-width="2"/>
            <polygon points="50,60 40,40 60,40" fill="${fillColor}" stroke="#FFFFFF" stroke-width="2"/>
            <text x="50%" y="25" dominant-baseline="middle" text-anchor="middle" fill="#FFFFFF" font-size="16" font-weight="bold">$${price}</text>
        </svg>
    `;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

const GoogleMapsComponent = () => {
    const dispatch = useDispatch();
    const listings = useSelector(state => state.listings.listings);
    const view = useSelector(state => state.view.currentView);
    const [markers, setMarkers] = useState([]);
    const [hoveredMarker, setHoveredMarker] = useState(null);
    const [selectedMarker, setSelectedMarker] = useState(null);

    useEffect(() => {
        if (view === 'listings') {
            const newMarkers = listings.map(listing => ({
                id: listing.listing_id,
                position: {
                    lat: parseFloat(listing.latitude),
                    lng: parseFloat(listing.longitude),
                },
                price: listing.price,
                details: listing
            }));
            setMarkers(newMarkers);
        }
    }, [view, listings]);

    const handleMarkerHover = useCallback((markerId) => {
        setHoveredMarker(markerId);
    }, []);

    const handleMarkerClick = useCallback((marker) => {
        setSelectedMarker(marker);
        console.log('Selected Marker Details:', marker.details); // Add console log
    }, []);

    const handleInfoWindowClick = useCallback((event) => {
        event.stopPropagation();
        if (selectedMarker) {
            dispatch(showListingDetails(selectedMarker.details));
            dispatch(showListingDetailsPopup());
        }
    }, [selectedMarker, dispatch]);

    const handleInfoWindowClose = useCallback(() => {
        setSelectedMarker(null);
    }, []);

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true
    };

    return (
        <div style={{ flex: 4 }}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
            >
                {markers.map(marker => (
                    <Marker
                        key={marker.id}
                        position={marker.position}
                        icon={{
                            url: createPriceMarker(marker.price, marker.id === hoveredMarker),
                            scaledSize: new window.google.maps.Size(100, 60),
                            anchor: new window.google.maps.Point(50, 60),
                        }}
                        onMouseOver={() => handleMarkerHover(marker.id)}
                        onMouseOut={() => handleMarkerHover(null)}
                        onClick={() => handleMarkerClick(marker)}
                    />
                ))}
                {selectedMarker && (
                    <InfoWindowF
                        position={selectedMarker.position}
                        onCloseClick={handleInfoWindowClose}
                        options={{ disableAutoPan: true }}
                    >
                        <div className={styles.infoWindow} onClick={handleInfoWindowClick}>
                            <Slider {...sliderSettings}>
                                {selectedMarker.details.images && selectedMarker.details.images.length > 0 ? (
                                    selectedMarker.details.images.split(',').map((image, index) => (
                                        <div key={index} className={styles.imageWrapper}>
                                            <img
                                                src={`http://localhost:3131/${image}`}
                                                alt="Listing"
                                                style={{ maxWidth: '100%', maxHeight: '250px', objectFit: 'contain' }}
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <div>No image available</div>
                                )}
                            </Slider>
                            <div className={styles.detailsContainer}>
                                <h3 className={styles.title}>{selectedMarker.details.address}</h3>
                                <p className={styles.text}>{selectedMarker.details.property_type}</p>
                                <p className={styles.text}>Price: ${selectedMarker.details.price}</p>
                                <p className={styles.text}>Bedrooms: {selectedMarker.details.bedrooms}</p>
                                <p className={styles.text}>Bathrooms: {selectedMarker.details.bathrooms}</p>
                                <p className={styles.text}>Area: {selectedMarker.details.area} Sq Ft</p>
                            </div>
                        </div>
                    </InfoWindowF>
                )}
            </GoogleMap>
        </div>
    );
};

export default GoogleMapsComponent;

