import React from 'react';
import { GoogleMap } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100vh'
};

const center = {
    lat: 48.115968, 
    lng: -122.567368
};

const GoogleMapsComponent = () => {
    return (
        <div style={{flex: 1}}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        {}
      </GoogleMap>
  </div>
  )
}

export default GoogleMapsComponent;
