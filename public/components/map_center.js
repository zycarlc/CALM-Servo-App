// import axios from "axios"

export function mapCenterInfo (centerLat, centerLng) {
    const mapCenterInfo = document.querySelector('.map-center-info')
    const mapCenterAddress= document.querySelector('.map-center-address')


    const openCageUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${centerLat},${centerLng}&key=AIzaSyCQCRzCc8azNxpcjGj6UzTooS0Yj8LH8Zo`
    
    axios
      .get(openCageUrl)
      .then(res => res.data.results[0].formatted_address)
      .then(address => mapCenterAddress.innerHTML = address)
      .then(mapCenterInfo.innerHTML = `
          <p>lat: ${centerLat} </p>
          <p>lon: ${centerLng} </p>
        `)
}


