// const { default: axios } = require("axios");



export function spotlight(event){
    if(event){
        event.preventDefault()
    }
    const spotlightServoName = document.querySelector(".spotlight-station-name")
    const spotlightInfo = document.getElementById("spotlight-info")
    axios.get("/api/stations/random")
        .then(res => {
            spotlightServoName.setAttribute("data-lat", res.data.latitude);
            spotlightServoName.setAttribute("data-lng", res.data.longitude);
            spotlightServoName.textContent = res.data.station_name
            spotlightInfo.innerHTML = `
            <p>${res.data.station_address}</p>`
        })
}