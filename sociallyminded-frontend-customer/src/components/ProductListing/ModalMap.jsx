import React from "react";
import { Map } from "react-map-gl";
import PointMarker from "../Map/PointMarker";
import { useState } from "react";

const MAPBOX_TOKEN = 'pk.eyJ1Ijoib25neW9uZ2VuMjAwMCIsImEiOiJjbDZseXN2ejQwZ25pM2JxcTNwbGY2Mm01In0.6_e_3aUVc5M9RUMI9S2sfw'
const MAP_STYLE = 'mapbox://styles/mapbox/streets-v9'

export const ModalMap = ({ addressData }) => {

    const [viewState, setViewState] = useState({
        longitude: addressData == null ? 103.77655039734071 : addressData.LONGITUDE,
        latitude: addressData == null ? 1.3555175316779877 : addressData.LATITUDE,
        zoom: 16
    });

    return (
         <Map
            mapboxAccessToken={MAPBOX_TOKEN}
            {...viewState}
            onMove={evt => setViewState(evt.viewState)}
            mapStyle={MAP_STYLE}
            style={{width:"100%", height:"40vh"}}
            latitude={addressData.LATITUDE}
            longitude={addressData.LONGITUDE}
        >
            <PointMarker
                longitude={addressData.LONGITUDE}
                latitude={addressData.LATITUDE}
            />
        </Map>
    )
}