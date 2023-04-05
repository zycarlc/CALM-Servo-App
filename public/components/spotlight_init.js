// const { default: axios } = require("axios");



export function spotlight(event){
    if(event){
        event.preventDefault()
    }
    const spotlightServoName = document.querySelector(".spotlight-station-name")
    const spotlightInfo = document.getElementById("spotlight-info")
    const spotlightLogo = document.querySelector(".spotlight-logo")
    axios.get("/api/stations/random")
        .then(res => {
            let spotlightOwner = res.data.station_owner
            let iconArr =["BP", "Caltex", "7-Eleven Pty Ltd", "Shell", "United"]
            if(!iconArr.includes(spotlightOwner)){
                spotlightOwner = "default"
            }else if (spotlightOwner === "7-Eleven Pty Ltd"){
                spotlightOwner = "seven11"
            }

            spotlightServoName.setAttribute("data-lat", res.data.latitude);
            spotlightServoName.setAttribute("data-lng", res.data.longitude);
            spotlightLogo.setAttribute("src", `../icons/100pix/${spotlightOwner}.png`)
            spotlightLogo.setAttribute("style", "width:auto;height:30px;")
            spotlightServoName.textContent = res.data.station_name
            spotlightInfo.innerHTML = `
            <p>${res.data.station_address}, ${res.data.station_suburb}</p>`
        })
}