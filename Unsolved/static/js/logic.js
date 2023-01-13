let newYorkCoords = [40.73, -74.0059];
let mapZoomLevel = 12;
let myMap
let url = "https://gbfs.citibikenyc.com/gbfs/en/station_information.json"
// Create the createMap function.
function createMap (bikeStations) {


  // Create the tile layer that will be the background of our map.
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);

  // Create a baseMaps object to hold the lightmap layer.
  // var baseMaps = {
  //   "Street Map": street,
  //   "Topographic Map": topo
  // };
  

  // Create an overlayMaps object to hold the bikeStations layer.
  // var overlayMaps = {
  //   "State Population": states,
  //   "City Population": cities
  // };
  

  // Create the map object with options.
  myMap = L.map("map", {
    center: newYorkCoords,
    zoom: mapZoomLevel
  });
};
  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
  // L.control.layers(baseMaps, overlayMaps, {
  //   collapsed: false
  // }).addTo(myMap);
  // }
// Create the createMarkers function.
function createMarkers (response) {
  // Pull the "stations" property from response.data.
  let station = response[i].stations
  // Initialize an array to hold the bike markers.
  bikeMarkers = []
  // Loop through the stations array.
  for (let i = 0; i < stations.name; i++) {
    // For each station, create a marker, and bind a popup with the station's name.
    // bikeMarkers.push(
    //   L.circle(stations[i].coordinates, {
    //     stroke: false,
    //     fillOpacity: 0.75,
    //     color: "white",
    //     fillColor: "white",
    //     radius: markerSize(locations[i].state.population)
    //   })
    // )};
    if (response[i].lat) {

    
    // Add the marker to the bikeMarkers array.
      markers.addLayer(L.marker([response[i].lat, response[i].lon])
      .bindPopup(response[i].name));
  }
  // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
  let bikes = L.layerGroup(bikeMarkers);
  createMap(bikes)
}};
// Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
d3.json(url).then(data => {
  console.log(data)
  createMarkers(data);
});

