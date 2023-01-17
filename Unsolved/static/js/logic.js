let newYorkCoords = [40.73, -74.0059];
let mapZoomLevel = 12;
let myMap
let url = "https://gbfs.citibikenyc.com/gbfs/en/station_information.json"
// Create the createMap function.
function createMap (bikeStations) {


  // Create the tile layer that will be the background of our map.
  // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  //   }).addTo(myMap);

  // Create a baseMaps object to hold the lightmap layer.
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  // let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  //   attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  // });

  let baseMaps = {
    "Street Map": street

  };
  

  // Create an overlayMaps object to hold the bikeStations layer.
  let overlayMaps = {
    "Bike Stations": bikeStations
  };
  

  // Create the map object with options.
  myMap = L.map("map-id", {
    center: newYorkCoords,
    zoom: mapZoomLevel,
    layers:[street, bikeStations] 
  });

  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
};
// Create the createMarkers function.
function createMarkers (response) {
  // Pull the "stations" property from response.data.
  let stations = response.data.stations;
  // Initialize an array to hold the bike markers.
  bikeMarkers = [];
  // Loop through the stations array.
  for (let i = 0; i < stations.length; i++) {

    if (stations[i].lat) {

    
    // Add the marker to the bikeMarkers array.
      bikeMarkers.push(L.marker([stations[i].lat, stations[i].lon])
      .bindPopup(stations[i].name));
  }
  // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
  let bikes = L.layerGroup(bikeMarkers);
  createMap(bikes)
}};
// Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
d3.json(url).then(data => createMarkers(data));

