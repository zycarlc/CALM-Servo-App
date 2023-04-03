
export function fetchServos () {
    return axios.get("/api/stations/all").then(res => res.data)
        // console.log(res.data)
        
        
}

