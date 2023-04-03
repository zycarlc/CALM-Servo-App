// import axios from "axios";
import { fetchServos } from "../servo_api.js"
import { mapCenterInfo } from "./components/map_center.js" ;

// Initialize and add the map
let map;

// Hooking onto the Date class within home.ejs
let time = document.querySelector('.date')




async function initMap() {
  // The location of G.A. Sydney
  const position = { lat: -33.8712, lng: 151.2046 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerView } = await google.maps.importLibrary("marker");

  map = new Map(document.getElementById("map"), {
    zoom: 13,
    center: position,
    mapId: "SERVO APP",
    minZoom: 10,
  });


  fetchServos()
  .then(res => res.forEach((station) => {
      const marker = new google.maps.Marker({
        position : { lat:Number(station.latitude), lng:Number(station.longitude) },
        map,
      })
  }))


  map.addListener("center_changed", () => {
    let centerPosition = map.getCenter()
    mapCenterInfo(centerPosition)
  });

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

// Setting a time that refreshes the time
function refreshTime() {
    const dateString = new Date().toLocaleString();
    const formattedString = dateString.replace(", ", " - ");
    time.innerText = formattedString
}

// refreshes the time every second
setInterval(refreshTime, 1000)

initMap();


