import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import { COLORS } from './options';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import "leaflet-extra-markers/dist/css/leaflet.extra-markers.min.css";
import "leaflet-extra-markers/dist/js/leaflet.extra-markers.js";

export function Map({ data }) {
  
  const getIcon = (color) => {
    return L.ExtraMarkers.icon({
      icon: 'fa-marker',
      markerColor: color,
      shape: 'penta',
      prefix: 'fa',
      svg: true,
    });
  };

  return (
    <MapContainer center={[53, 9]} zoom={4} scrollWheelZoom={true} style={{ height: "500px" }}>
      <TileLayer
        url="https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoicm9va2llcm9vayIsImEiOiJjbDA4MnVhbnQwNTFjM2NwOXBycHU2ZHNrIn0.64Yv7XFZumGxYKAMCvm8nA"
        attribution="Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>"
      />
      {data && Object.entries(data).length !== 0 && Object.entries(data).map(([key, value], i) => 
        <Marker key={i} position={[value.coordinates.lat, value.coordinates.lng]} animate={true} 
          icon={getIcon(COLORS[i % COLORS.length])} 
        >
          <Tooltip
  style={{
    backgroundColor: '#f0f0f0', 
    borderRadius: '16px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', 
    overflow: 'hidden', 
  }}
>

  <div>

    <h3 style={{
      backgroundColor: '#333', 
      color: '#fff', 
      padding: '10px',
      textAlign: 'center',
      margin: 0, 
      borderBottom: '1px solid #444', 
    }}>
      {value.name}
    </h3>


    <ul style={{
      padding: '10px',
      listStyleType: 'none',
      margin: 0, 
    }}>
      {value.hazards && value.hazards.map((hazard, index) => (
        <li key={index} style={{ marginBottom: '10px' }}>
          <strong>Type:</strong> <br/>{hazard.type} <br />

          <strong>Probability:</strong> 
          <span style={{
            color: '#fff',
            backgroundColor: hazard.probability === 'Low' ? '#28a745' : hazard.probability === 'Medium' ? '#ff9800' : '#d32f2f',
            padding: '2px 8px',
            borderRadius: '12px',
            display: 'inline-block',
            marginLeft: '5px'
          }}>
            {hazard.probability}
          </span> 
          <br />

          <strong>Magnitude:</strong> 
          <span style={{
            color: '#fff',
            backgroundColor: hazard.magnitude === 'Low' ? '#28a745' : hazard.magnitude === 'Medium' ? '#ff9800' : '#d32f2f',
            padding: '2px 8px',
            borderRadius: '12px',
            display: 'inline-block',
            marginLeft: '5px'
          }}>
            {hazard.magnitude}
          </span>
        </li>
      ))}
    </ul>
  </div>
</Tooltip>


        </Marker>
      )}
    </MapContainer>
  );
}
