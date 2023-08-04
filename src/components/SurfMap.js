import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "./Map.css";



mapboxgl.accessToken =
  "pk.eyJ1IjoibGltYXJ5ZzExIiwiYSI6ImNsa3ZwdGRtMzBtb3kzZ29jM3R3MDBoanoifQ.2QNl2lmg3q3v0xWuflJeYQ";

const SurfMap = () => {
    const mapContainerRef = useRef(null);

    // initialize map when component mounts
    useEffect(() => {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        // See style options here: https://docs.mapbox.com/api/maps/#styles
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-158.1045, 21.5936],
        zoom: 12.5,
      });
  
      // add navigation control (the +/- zoom buttons)
      map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
  
      // clean up on unmount
      return () => map.remove();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
    return <div className="map-container" ref={mapContainerRef} />;
  };
  

export default SurfMap;