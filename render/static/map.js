const copy = "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors";
const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const osm = L.tileLayer(url, { attribution: copy });
const map = L.map("map", { layers: [osm]});
const markers = JSON.parse(document.getElementById("markers-data").textContent);
const features = L.geoJSON(markers, {
    onEachFeature: (feature, layer) => {
      const popupContent = `
      <b>Name:</b> ${feature.properties.name_en}<br>
      <b>Source:</b> ${feature.properties.source}<br>
      <b>Output MW:</b> ${feature.properties.outp_mw}
    `; 
  
      layer.bindPopup(popupContent);
    }
  });

const worldBorder = JSON.parse(document.getElementById("world-border-data").textContent);

const worldBorderLayer = L.geoJSON(worldBorder, {
    style: {
        fillColor: 'transparent', // Set the fill color to none or any desired color
        color: 'black',   // Border color
        weight: 1         // Border weight
    }
});

// Add the World Borders GeoJSON layer to the map


const LayerToggleControl = L.Control.extend({
  onAdd: function(map) {
      const container = L.DomUtil.create("div", "layer-toggle-control");      
      const reactorsCheckbox = L.DomUtil.create("input", "", container);
      reactorsCheckbox.type = "checkbox";
      reactorsCheckbox.id = "reactorsLayerToggle";
      reactorsCheckbox.checked = true;
      
      const reactorsLabel = L.DomUtil.create("label", "", container);
      reactorsLabel.setAttribute("for", "reactorsLayerToggle");
      reactorsLabel.innerText = "Nuclear reactors";
      
      reactorsCheckbox.addEventListener("change", () => {
          if (reactorsCheckbox.checked) {
              map.addLayer(features);
          } else {
              map.removeLayer(features);
          }
      });
      
      const bordersCheckbox = L.DomUtil.create("input", "", container);
      bordersCheckbox.type = "checkbox";
      bordersCheckbox.id = "bordersLayerToggle";
      bordersCheckbox.checked = false;
      
      const bordersLabel = L.DomUtil.create("label", "", container);
      bordersLabel.setAttribute("for", "bordersLayerToggle");
      bordersLabel.innerText = "World Borders";
      
      bordersCheckbox.addEventListener("change", () => {
          if (bordersCheckbox.checked) {
              map.addLayer(worldBorderLayer);
          } else {
              map.removeLayer(worldBorderLayer);
          }
      });

      return container;
  }
});


// ... Your existing code ...

// Add the LayerToggleControl to the map's top-right corner
map.addControl(new LayerToggleControl({ position: "topright" }));

// Add the OpenStreetMap layer to the map
osm.addTo(map);

const worldCenter = [20, 0]; // Center coordinates
const worldZoom = 3; // Zoom level for world view

// Set the initial view of the map
map.setView(worldCenter, worldZoom);

// Add the GeoJSON features layer to the map
features.addTo(map);


