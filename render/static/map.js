const copy = "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors";
const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const osm = L.tileLayer(url, { attribution: copy });
const map = L.map("map", { layers: [osm] });
const markers = JSON.parse(document.getElementById("markers-data").textContent);
//Make features variable with popup of properties when clicked.

var MyIcon = L.icon({
  iconUrl: 'https://i.ibb.co/qnJV9tM/thenounproject.png',
  iconSize:     [75, 75], // size of the icon
});

const features = L.geoJSON(markers,  
  { 
    onEachFeature: (feature, layer) => {
      const popupContent = `
      <b>Name:</b> ${feature.properties.name_en}<br>
      <b>Source:</b> ${feature.properties.source}<br>
      <b>Output MW:</b> ${feature.properties.outp_mw}
    `; 
  
      layer.bindPopup(popupContent);
    },
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, { 
      icon: MyIcon,
      riseOnHover: true });
  }
  });
//variables to make the correct view
const worldCenter = [20, 0]; // Center coordinates
const worldZoom = 3; // Zoom level for world view
//add different basemap
const googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3']
});
//define basemap list
const baseMaps = {
    "Base Layer": osm,
    "google sat": googleSat // Replace 'baseLayer' with your actual base layer
};
//define layers list
const overlayMaps = {
    "Generators": features
};
//add layer control to the map
const layerControl = L.control.layers(baseMaps,overlayMaps).addTo(map);

// Set the initial view of the map
map.setView(worldCenter, worldZoom);

// Add the GeoJSON features layer to the map
features.addTo(map);