import React from 'react';
import { GoogleMap } from '@react-google-maps/api';

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
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        {}
      </GoogleMap>
  )
}

export default GoogleMapsComponent;
