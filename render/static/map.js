const copy = "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors";
const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const osm = L.tileLayer(url, { attribution: copy });
const map = L.map("map", { layers: [osm] });
const markers = JSON.parse(document.getElementById("markers-data").textContent);
const features = L.geoJSON(markers);
map.addLayer(features).fitWorld();