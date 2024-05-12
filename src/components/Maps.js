import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
    width: '400px',
    height: '400px'
};

const center = {
    lat: 48.115968, 
    lng: -122.567368
};

const GoogleMapsComponent = () => {
    return (
    <LoadScript
      googleMapsApiKey = {process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        {}
      </GoogleMap>
    </LoadScript>
  )
}

export default GoogleMapsComponent;
