import axios from "axios"

export function fetchServos () {
    return axios.get("/api/stations/all").then(res => res.data)
        // console.log(res.data)
        
        
}

export function findOneRandomly () {
    return axios.get("/api/stations/random").then(res)
}