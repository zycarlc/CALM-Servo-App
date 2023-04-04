// import axios from "axios";
import { fetchServos, fetchServosWithin } from "../servo_api.js"
import { mapCenterInfo } from "./components/map_center.js" ;
import { getOilPrice } from "./components/Oil_price.js";
import { getUserLocation } from "./components/get_user_location.js"
import { spotlight } from "./components/spotlight_init.js";







// Initialize and add the map
let map;

// Hooking onto the Date class within home.ejs
let time = document.querySelector('#timeOutput')






async function initMap() {
    // The location of G.A. Sydney
    const position = { lat: -36.358334, lng: 146.312500 };
    // const position = {};
 
    // Request needed libraries.
    //@ts-ignore
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerView } = await google.maps.importLibrary("marker");

            
            
    map = new Map(document.getElementById("map"), {
        zoom: 13,
        center: position,
        mapId: "SERVO APP",
        minZoom: 10,
    })

    getUserLocation()
    .then(res => {
        if (res.error) {
            return position
        }
        position.lat = Number(res.lat)
        position.lng = Number(res.lng)
        return {lat: res.lat, lng: res.lng}
    })
    .then(res => map.setCenter(res))

    mapCenterInfo(map.getCenter().lat(), map.getCenter().lng())
    getOilPrice()
    spotlight()
    

    const icons = {
        "BP": {
          icon: "/icons/BP.png"
        },
        "Caltex": {
            icon: "/icons/caltex.png"
          },
        "7-Eleven Pty Ltd": {
            icon: "/icons/seven11.png"
          },
        "Shell": {
            icon: "/icons/shell.png"
          },
        "United": {
            icon: "/icons/united.png"
          },
        "Default": {
            icon: "/icons/default.png"
        }
    }


    // fetchServos()
    //     .then(res => res.forEach((station) => {

            
    //         if(!icons[station.station_owner]){
    //             station.station_owner = "Default"
    //         }

    //         const marker = new google.maps.Marker({
    //             position : { lat:Number(station.latitude), lng:Number(station.longitude) },
    //             map,
    //             icon: icons[station.station_owner].icon,
    //             label: "",
    //             title: `${station.station_address}` 
    //         })
            
    //         const infoWindow = new google.maps.InfoWindow();
    //         const contentString = `<h3>${station.station_name}</h1>` +`<p>${station.station_address}</p>`

    //         marker.addListener("click", () => {
    //             infoWindow.close();
    //             infoWindow.setContent(contentString);
    //             infoWindow.open(marker.getMap(), marker);
    //         });

    //         //   const infoWindow1 = new google.maps.InfoWindow();
    //         marker.addListener('mouseover', function() {
    //             // infoWindow1.setContent(`<p>${station.station_name}</p>`);
    //             // infoWindow1.open(marker.getMap(), marker);
    //             marker.set("label", {
    //                 text: `${station.station_name}`,
    //                 color: '#00008B',
    //                 fontSize:'20px',
    //                 fontWeight:'bold',
    //             })           
    //         });

    //         marker.addListener('mouseout', function() {
    //             marker.set("label", "")
    //         });

    //     }))

    map.addListener("center_changed", () => {
    let centerLat = map.getCenter().lat()
    let centerLon = map.getCenter().lng()
    mapCenterInfo(centerLat, centerLon)
    });

    map.addListener("mouseup", () => {
        fetchServos()
    })

    map.addListener("zoom_changed", () => {
        fetchServos()
    })

    map.addListener('bounds_changed', function() {
        const northEast = map.getBounds().getNorthEast()
        const southWest = map.getBounds().getSouthWest()
        const latNE =  northEast.lat()
        const lngNE =  northEast.lng()
        const latSW =  southWest.lat()
        const lngSW =  southWest.lng()
        fetchServosWithin({ latNE, lngNE, latSW, lngSW })
            // .then(res => console.log(res))
            .then(res => res.forEach((station) => {

            
                if(!icons[station.station_owner]){
                    station.station_owner = "Default"
                }
    
                const marker = new google.maps.Marker({
                    position : { lat:Number(station.latitude), lng:Number(station.longitude) },
                    map,
                    icon: icons[station.station_owner].icon,
                    label: "",
                    title: `${station.station_address}` 
                })
                
                const infoWindow = new google.maps.InfoWindow();
                const contentString = `<h3>${station.station_name}</h1>` +`<p>${station.station_address}</p>`
    
                marker.addListener("click", () => {
                    infoWindow.close();
                    infoWindow.setContent(contentString);
                    infoWindow.open(marker.getMap(), marker);
                });
    
                //   const infoWindow1 = new google.maps.InfoWindow();
                marker.addListener('mouseover', function() {
                    // infoWindow1.setContent(`<p>${station.station_name}</p>`);
                    // infoWindow1.open(marker.getMap(), marker);
                    marker.set("label", {
                        text: `${station.station_name}`,
                        color: '#00008B',
                        fontSize:'20px',
                        fontWeight:'bold',
                    })           
                });
    
                marker.addListener('mouseout', function() {
                    marker.set("label", "")
                });
    
            }))
    })
}
    
  
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
      
    // });
//   // The marker, positioned at Uluru
//   const marker = new AdvancedMarkerView({
//     map: map,
//     position: position,
//     title: "Uluru",
//   });

// fetch data from db and display in spotlight box
const spotlightRefresh = document.getElementById("refresh-spot")

spotlightRefresh.addEventListener("click",spotlight)

// Setting a time that refreshes the time
function refreshTime() {
    const dateString = new Date().toLocaleString();
    const formattedString = dateString.replace(", ", " - ");
    time.innerText = formattedString
}

// refreshes the time every second
setInterval(refreshTime, 1000)

initMap();
