// const { default: axios } = require("axios");



export function spotlight(event){
    if(event){
        event.preventDefault()
    }
    

    const spotlightInfo = document.getElementById("spotlight-info")
    axios.get("/api/stations/random")
        .then(res => {

            spotlightInfo.innerHTML = `
            <p>${res.data.station_name}</p>
            <p>${res.data.station_address}</p>`
        })
}