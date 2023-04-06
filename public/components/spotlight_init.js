export function spotlight(event){
    let icons = {
        BP: "https://res.cloudinary.com/dmla1ujpx/image/upload/v1680754277/BP_kcqdy7.png",
        Caltex: "https://res.cloudinary.com/dmla1ujpx/image/upload/v1680754277/caltex_hjng3g.png",
        seven11: "https://res.cloudinary.com/dmla1ujpx/image/upload/v1680754278/seven11_k3dqag.png",
        Shell: "https://res.cloudinary.com/dmla1ujpx/image/upload/v1680754277/shell_bva7s1.png",
        United: "https://res.cloudinary.com/dmla1ujpx/image/upload/v1680754278/united_zadmjo.png",
        default: "https://res.cloudinary.com/dmla1ujpx/image/upload/v1680754277/default_bcwlof.png"
    }
    if(event){
        event.preventDefault()
    }
    const spotlightServoName = document.querySelector(".spotlight-station-name")
    const spotlightInfo = document.getElementById("spotlight-info")
    const spotlightLogo = document.querySelector(".spotlight-logo")
    axios.get("/api/stations/random")
        .then(res => {
            let [ width, height ] = [ 37, 37 ]
            let spotlightOwner = res.data.station_owner
            let iconArr =["BP", "Caltex", "7-Eleven Pty Ltd", "Shell", "United"]
            if(!iconArr.includes(spotlightOwner)){
                spotlightOwner = "default"
                width = 26
                height = 37
            }else if (spotlightOwner === "7-Eleven Pty Ltd"){
                spotlightOwner = "seven11"
            }

            spotlightServoName.setAttribute("data-lat", res.data.latitude);
            spotlightServoName.setAttribute("data-lng", res.data.longitude);
            spotlightLogo.setAttribute("src", icons[spotlightOwner])
            spotlightLogo.setAttribute("style", `width:${width}px;height:${height}px;`)
            spotlightServoName.textContent = res.data.station_name
            spotlightInfo.innerHTML = `
            <p>${res.data.station_address}, ${res.data.station_suburb}</p>`
        })
}