import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./SurfMap.css";



mapboxgl.accessToken =
  "pk.eyJ1IjoibGltYXJ5ZzExIiwiYSI6ImNsa3ZwdGRtMzBtb3kzZ29jM3R3MDBoanoifQ.2QNl2lmg3q3v0xWuflJeYQ";

const SurfMap = ({surfLocations}) => {
    const mapContainerRef = useRef(null);

    // initialize map when component mounts
    useEffect(() => {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        // See style options here: https://docs.mapbox.com/api/maps/#styles
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-158.1045, 21.5936],
        zoom: 2,
      });
  
      // add navigation control (the +/- zoom buttons)
      map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
  
      surfLocations.forEach((surfLocation) => {
        const marker = new mapboxgl.Marker()
          .setLngLat([surfLocation.longitude, surfLocation.latitude])
          .addTo(map);
    
        // Attach a popup with surf location details
        const popup = new mapboxgl.Popup({ offset: 25 })
          .setHTML(`<div>
          <h3>${surfLocation.name}</h3>
          <p>${surfLocation.description}</p>
          <a href="/locations/${surfLocation.id}">See Details</a>
       </div>`);
        
        marker.setPopup(popup);
      });
    
      return () => map.remove();
    }, [surfLocations]);
      // clean up on unmount
    //   return () => map.remove();
    // }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
    return <div className="map-container" ref={mapContainerRef} />;
  };
  

export default SurfMap;