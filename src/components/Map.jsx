import { MapContainer, TileLayer, Marker, Popup, GeoJSON, FeatureGroup } from 'react-leaflet'
import { EditControl } from 'react-leaflet-draw'
import hash from 'object-hash';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css'
const osmtogeojson = require('osmtogeojson');
const parser = new DOMParser();
const Map = ({ mapFeatures, setMapFeatures, setVerifyAPI }) => {
    const _created = async (e) => {
        const res = await fetch(`https://www.openstreetmap.org/api/0.6/map?bbox=${e.layer._bounds._southWest.lng},${e.layer._bounds._southWest.lat},${e.layer._bounds._northEast.lng},${e.layer._bounds._northEast.lat}`)
            .then(response => {
                if (response.ok) {
                    return response.text()
                }
                else {
                    setVerifyAPI(true)
                }
            })
            .catch(err => console.log(err))

        const parsed = parser.parseFromString(res, "text/xml");
        const json_data = osmtogeojson(parsed)
        setMapFeatures(json_data)
    }


    return (
        <MapContainer
            center={[51.0, 19.0]}
            zoom={4}
            maxZoom={18}
            style={{ height: '50vh', width: '100%' }}
        >
            <FeatureGroup>
                <EditControl position="topright" onCreated={_created} draw={{
                    circle: false,
                    circlemarker: false,
                    marker: false,
                    polyline: false,
                    polygon: false
                }} />
            </FeatureGroup>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <GeoJSON key={hash(mapFeatures)} data={mapFeatures.features} style={() => { return ({ fillColor: "red" }) }} />

        </MapContainer>
    )
}
export default Map