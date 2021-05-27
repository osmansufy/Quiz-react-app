

import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css';

mapboxgl.accessToken =
  'pk.eyJ1Ijoib3NtYW5zdWZ5IiwiYSI6ImNrajVnaWlkNDYwbnYycnFqcjhlYXN6Y3YifQ.GN1g-ZwsHgSqkTOUPxaalA';

const Map = () => {
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(90.4125);
  const [lat, setLat] = useState( 23.8103); 
  const [zoom, setZoom] = useState(1.5);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'http://tilesv3.dingi.live/styles/Combined-Bangla/style.json',
      center: [lng, lat],
      zoom: zoom
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right'); 
    // map.addControl(
    //   new mapboxgl.GeolocateControl({
    //   positionOptions: {
    //   enableHighAccuracy: true
    //   },
    //   trackUserLocation: true
    //   })
    //   );
  

  
    
      map.on('move', () => {
        setLng(map.getCenter().lng.toFixed(4));
        setLat(map.getCenter().lat.toFixed(4));
        setZoom(map.getZoom().toFixed(2));
      });
// Set options

const marker =(new mapboxgl.Marker({color: "red",
draggable: true,
}))
marker.setLngLat([lng, lat])
.addTo(map);

function onDragEnd() {
  var lngLat = marker.getLngLat();
  setLng(lngLat.lng );
  setLat(lngLat.lat);
  
  }
   
  marker.on('dragend', onDragEnd);
  var geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
    enableHighAccuracy: true
    },
    trackUserLocation: true
    });
    // Add the control to the map.
    map.addControl(geolocate);
    // Set an event listener that fires
    // when a trackuserlocationend event occurs.
    geolocate.on('trackuserlocationstart', function() {
    console.log('A trackuserlocationend event has occurred.')
    marker.setLngLat([lng, lat])
    });
  
  

// marker.dragend({
//   setLng(map.getCenter().lng.toFixed(4));
//   setLat(map.getCenter().lat.toFixed(4));
//   setZoom(map.getZoom().toFixed(2));
// })
// var lngLat = marker.getLngLat();
// console.log('Longitude: ' + lngLat.lng + ', Latitude: ' + lngLat.lat )


    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  console.log(lng)


  return (
    
    <div>
      <div className='sidebarStyle'>
        <div>
      
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
      <div className='map-container' ref={mapContainerRef} />
    </div>
  );
};

export default Map;
