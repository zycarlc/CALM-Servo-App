import { getDistanceFromLatLon } from "./distance_to_map_center.js";
import { renderServoList } from "./servo_list.js";
import { fetchServos } from "../servo_api.js"


export function nearestList(centerLat, centerLon){
    
let totalStationArr = []
    let outputArr = []

    fetchServos()
    .then(stations => {
        // console.log(stations)
        let distanceArr = []

        stations.forEach(station => {

            let distanceToCenter = Math.floor(getDistanceFromLatLon(centerLat, centerLon, Number(station.latitude), Number(station.longitude)))
            console.log(distanceToCenter)

            let pairArr = []
            
            pairArr.push(distanceToCenter, station.station_owner, station.station_name, station.station_address)

            distanceArr.push(distanceToCenter)

            totalStationArr.push(pairArr)     
        
        })
        return distanceArr.sort(function(a, b) { return a - b }).slice(0, 10)
    })
    .then(sortInOrderArr => {

        sortInOrderArr.forEach(distance => {
            totalStationArr.forEach(station =>{
                if(station[0] === distance){
                    outputArr.push(station)
                }
            })
        })
        return outputArr
    })
    .then(res =>renderServoList(res))
    .then(()=>{
        outputArr.splice(0, 10)
    })

}