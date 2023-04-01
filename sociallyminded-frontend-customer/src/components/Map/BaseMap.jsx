
import Map from "react-map-gl";
import { useState } from 'react';
import "mapbox-gl/dist/mapbox-gl.css";

import PointMarker from './PointMarker.jsx'


const BaseMap = () => {

  const [viewState, setViewState] = useState({
    longitude: 103.77655039734071,
    latitude: 1.3555175316779877, 
    zoom: 10
  });


  return (
      <Map
        mapboxAccessToken={'pk.eyJ1Ijoib25neW9uZ2VuMjAwMCIsImEiOiJjbDZseXN2ejQwZ25pM2JxcTNwbGY2Mm01In0.6_e_3aUVc5M9RUMI9S2sfw'}
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        style={{width:"95vw", height:"70vh"}}
      >
        <PointMarker
            longitude={103.77655039734071}
            latitude={1.2955175316779877}
        />
      </Map>
  );
}

export default BaseMap;





   





