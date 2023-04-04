// import axios from "axios"

export function mapCenterInfo (centerLat, centerLng) {
    const mapCenterInfo = document.querySelector('.map-center-info')
    const mapCenterAddress= document.querySelector('.map-center-address')

    // I just give out my opencage apikey for now. need to find a good way to hide it. .env is not a good way as it is not accessible on the client side
    const openCageUrl = `https://api.opencagedata.com/geocode/v1/json?q=${centerLat}+${centerLng}&key=8482d436c4c84782905e0bd75b3d7709&language=en`
    
    axios
      .get(openCageUrl)
      .then(res => res.data.results[0].formatted)
      .then(address => mapCenterAddress.innerHTML = address)
      .then(mapCenterInfo.innerHTML = `
          <p>lat: ${centerLat} </p>
          <p>lon: ${centerLng} </p>
        `)
}


