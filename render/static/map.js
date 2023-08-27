const copy = "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors";
const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const osm = L.tileLayer(url, { attribution: copy });
const map = L.map("map", { layers: [osm] });
const markers = JSON.parse(document.getElementById("markers-data").textContent);
const features = L.geoJSON(markers);
const worldCenter = [20, 0]; // Center coordinates
const worldZoom = 3; // Zoom level for world view

googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3']
});

var baseMaps = {
    "Base Layer": osm,
    "google sat": googleSat // Replace 'baseLayer' with your actual base layer
};

var overlayMaps = {
    "Generators": features
};

var layerControl = L.control.layers(baseMaps,overlayMaps).addTo(map);

// Set the initial view of the map
map.setView(worldCenter, worldZoom);

// Add the GeoJSON features layer to the map
features.addTo(map);