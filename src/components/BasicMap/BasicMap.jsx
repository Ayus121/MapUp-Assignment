import React, { useState,useEffect } from 'react';
import {useRef} from 'react';
import {MapContainer,TileLayer,Marker,Popup, useMap} from 'react-leaflet';
import L from 'leaflet'
import "leaflet/dist/leaflet.css"
import osm from './osmProvider';

function ResetCenterView(props){
const {selectPosition } = props;
const map = useMap();
// console.log(props)
useEffect(() => {
	if(selectPosition){
		map.setView(
			L.latLng(parseFloat(selectPosition?.lat),parseFloat(selectPosition?.lon)),
			map.getZoom(),
			{
				animate:true
			}
		)
	}
},[selectPosition])


return null;
}

const BasicMap = (props) => {
	const[center,setCenter] = useState({lat:28.6139,lng:77.248357});
	const {selectPosition} = props;
	const lat = parseFloat(selectPosition?.lat)
	const lon = parseFloat(selectPosition?.lon)
	const locationSelection = [lat,lon]
	const zoomLevel = 10;
	const mapRef = useRef();
	const icon = L.icon({
		iconUrl:"./location.png"
	})

  return (
	<>
		<MapContainer center={center} zoom={zoomLevel} ref={mapRef} style={{width:'100%',height:'100%'}}>
			<TileLayer url={osm.maptiler.url} attribution={osm.maptiler.attribution} />
			{selectPosition &&(
			<Marker position={locationSelection} icon={icon}>
				<Popup>
					Hello
				</Popup>
			</Marker>)}
			<ResetCenterView selectPosition={selectPosition} />
		</MapContainer>
	</>
  )
}

export default BasicMap