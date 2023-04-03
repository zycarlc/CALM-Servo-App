

// Initialize and add the map
let map;




async function initMap() {
  // The location of Uluru
  const position = { lat: -33.8712, lng: 151.2046 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerView } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 13,
    center: position,
    mapId: "DEMO_MAP_ID",
    minZoom: 10,
  });


  axios.get("/api/stations/all")
  .then(res => res.data.forEach((station) => {
      const marker = new google.maps.Marker({
        position : {lat:Number(station.latitude), lng:Number(station.longitude)},
        map,
    
      })
    }))


    // const infoWindow = new google.maps.InfoWindow();
  
    // Create the markers.
    // tourStops.forEach((stop) => {
    //   const marker = new google.maps.Marker({
    //     position : stop.location,
    //     map,
    //     title: `${stop.name} is ${stop.distanceInKm}Km away` ,
    //     label: `${stop.orderSeri}`,
    //     optimized: false,
    //   });
  
    //   // Add a click listener for each marker, and set up the info window.
    //   marker.addListener("click", () => {
    //     infoWindow.close();
    //     infoWindow.setContent(marker.getTitle());
    //     infoWindow.open(marker.getMap(), marker);
    //   });
    // });
//   // The marker, positioned at Uluru
//   const marker = new AdvancedMarkerView({
//     map: map,
//     position: position,
//     title: "Uluru",
//   });
}



initMap();

