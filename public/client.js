// import axios from "axios";
import { fetchServos, fetchServosWithin } from "../servo_api.js"
import { mapCenterInfo } from "./components/map_center.js" ;
import { getOilPrice } from "./components/Oil_price.js";
import { getUserLocation } from "./components/get_user_location.js"
import { spotlight } from "./components/spotlight_init.js";
import { nearestList } from "./components/nearest_station.js";

// import { getDistanceFromLatLon } from "./components/distance_to_map_center.js";
// import { renderServoList } from "./components/servo_list.js";
// import { fetchServos } from "../servo_api"



const leftAside = document.querySelector(".left")
const leftAsideChildren = leftAside.querySelectorAll("section")
const leftCollapseBtn = document.querySelector("#leftCollapseBtn")
leftCollapseBtn.addEventListener("click", handleLeftCollapse)
let leftIsCollapsed = false;

function handleLeftCollapse(event) {
    if (!leftIsCollapsed) {
        leftAsideChildren.forEach(child => {
            child.style.visibility = "hidden"
        })
        leftIsCollapsed = !leftIsCollapsed
        leftAside.classList.add("left-collapsed")
        leftCollapseBtn.className = "fa-solid fa-circle-chevron-right"
    } else {
        leftAsideChildren.forEach(child => {
            child.style.visibility = "visible"
        })
        leftIsCollapsed = !leftIsCollapsed
        leftAside.classList.remove("left-collapsed")
        leftCollapseBtn.className = "fa-solid fa-circle-chevron-left"
    }
    
}

const rightAside = document.querySelector(".right")
const rightAsideChildren = rightAside.querySelectorAll("section")
const rightCollapseBtn = document.querySelector("#rightCollapseBtn")
rightCollapseBtn.addEventListener("click", handleRightCollapse)
let rightIsCollapsed = false;

function handleRightCollapse(event) {
    if (!rightIsCollapsed) {
        rightAsideChildren.forEach(child => {
            child.style.visibility = "hidden"
        })
        rightIsCollapsed = !rightIsCollapsed
        rightAside.classList.add("right-collapsed")
        rightCollapseBtn.className = "fa-solid fa-circle-chevron-left"
    } else {
        rightAsideChildren.forEach(child => {
            child.style.visibility = "visible"
        })
        rightIsCollapsed = !rightIsCollapsed
        rightAside.classList.remove("right-collapsed")
        rightCollapseBtn.className = "fa-solid fa-circle-chevron-right"
    }
    
}





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


    
    let centerLat = map.getCenter().lat()
    let centerLon = map.getCenter().lng()

    nearestList(centerLat, centerLon)
    
    map.addListener("center_changed", () => {
    centerLat = map.getCenter().lat()
    centerLon = map.getCenter().lng()
    mapCenterInfo(centerLat, centerLon)
    nearestList(centerLat, centerLon)
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

                // /renderServoList (servos)
            
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
    
                marker.addListener('mouseover', function() {

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


    
    // map.addListener('center_changed', function() {
    //     centerLat = map.getCenter().lat()
    //     centerLon = map.getCenter().lng()
    
    //     // nearestList(centerLat, centerLon)

    // })

}


// let centerLat = map.getCenter().lat()
// let centerLon = map.getCenter().lng()



    
  
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




