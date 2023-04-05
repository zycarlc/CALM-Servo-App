// import axios from "axios";
import { fetchServos, fetchServosWithin, fetchServosWithinRadius } from "../servo_api.js"
import { mapCenterInfo } from "./components/map_center.js" ;
import { getOilPrice } from "./components/Oil_price.js";
import { getUserLocation } from "./components/get_user_location.js"
import { spotlight } from "./components/spotlight_init.js";
import { nearestList } from "./components/nearest_station.js";

// import { getDistanceFromLatLon } from "./components/distance_to_map_center.js";
// import { renderServoList } from "./components/servo_list.js";
// import { fetchServos } from "../servo_api"


// Left aside DOM variables
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

// Right aside DOM variables
const rightAside = document.querySelector(".right")
const rightAsideChildren = rightAside.querySelectorAll("section")
const rightCollapseBtn = document.querySelector("#rightCollapseBtn")
rightCollapseBtn.addEventListener("click", handleRightCollapse)
let rightIsCollapsed = false;

document.addEventListener("keydown", e =>{
    if (e.key.toLowerCase() === "b" && e.ctrlKey){
        handleLeftCollapse(e)
        handleRightCollapse(e)
    }
})

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

// save the markers as a global array
let markersArray = []
let searchRadius = .2;

async function initMap() {
    // The location of G.A. Sydney
    const position = { lat: -36.358334, lng: 146.312500 };
    // const position = {};
 
    // Request needed libraries.
    //@ts-ignore
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerView } = await google.maps.importLibrary("marker");

            
            
    map = new Map(document.getElementById("map"), {
        zoom: 10,
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
          icon: "/icons/100pix/BP.png"
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

    function removeMarkers (centerObj) {

        let latNE = centerObj.center.lat + centerObj.radius
        let lngNE = centerObj.center.lng + centerObj.radius
        let latSW = centerObj.center.lat - centerObj.radius
        let lngSW = centerObj.center.lng - centerObj.radius


        markersArray.forEach((mark) => {
            let lat = mark.getPosition().lat()
            let lng = mark.getPosition().lng()
            // if (lat > latNE || lat < latSW || lng > lngNE || lng < lngSW) {
                mark.setMap(null)
            // }
        })
        markersArray = []
    }

    function addMarkers (stationsArray) {
        stationsArray.forEach((station) => {   
            //if the station brand is not one of the biggest one. then set to default logo
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

            markersArray.push(marker)
        })
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

    // map.addListener("mouseup", () => {
    //     fetchServos()
    // })

    // map.addListener("zoom_changed", () => {
    //     fetchServos()
    // })

    map.addListener('bounds_changed', function() {

        const coordObj = {
            "center": {
                "lat": map.getCenter().lat(),
                "lng": map.getCenter().lng()
            },
            "radius": searchRadius
        }
        removeMarkers(coordObj);
        fetchServosWithinRadius(coordObj)
            .then(stationsArray => addMarkers(stationsArray))
        // fetchServosWithin({ latNE, lngNE, latSW, lngSW })
            // .then(res => console.log(res))
        // loop through all the markers, find their lat&lng, if outside bounds, turn the markers to null.
    })

    // Radius slider DOM variables
    const radiusSlider = document.querySelector("#radiusSlider")
    radiusSlider.addEventListener("change", adjustSearchRadius)

    function adjustSearchRadius(event) {
        const coordObj = {
            "center": {
                "lat": map.getCenter().lat(),
                "lng": map.getCenter().lng()
            },
            "radius": event.target.value * .1
        }
        removeMarkers(coordObj)

        fetchServosWithinRadius(coordObj)
            .then(stationsArray => addMarkers(stationsArray))
    }
}

// fetch data from db and display in spotlight box
const spotlightRefresh = document.getElementById("refresh-spot")
spotlightRefresh.addEventListener("click",spotlight)

const spotlightDirect = document.querySelector(".spotlight-station-name")
spotlightDirect.addEventListener("click", (event) => {
    if (event) {
        event.preventDefault()
    }
    let coordinate = event.target.dataset
    map.setCenter({lat: Number(coordinate.lat), lng: Number(coordinate.lng)})
})

// Setting a time that refreshes the time
function refreshTime() {
    const currentTime = new Date().toLocaleString()
    const dateString = new Date()
    const formattedDay = dateString.toLocaleDateString("en-AU", { weekday: "long" })
    const formattedTime = currentTime.replace(" , ", " - ")
    time.innerText = formattedDay + " " + formattedTime

}

// refreshes the time every second
setInterval(refreshTime, 1000)

initMap();