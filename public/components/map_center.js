// import axios from "axios"

export function mapCenterInfo (centerLat, centerLng) {
    const mapCenterInfo = document.querySelector('.map-center-info')
    const mapCenterAddress= document.querySelector('.map-center-address')


    const googleGeocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${centerLat},${centerLng}&key=${googleMapKey}`
    
    axios
      .get(googleGeocodingUrl)
      .then(res => res.data.results[0].formatted_address)
      .then(address => mapCenterAddress.innerHTML = address)
      .then(mapCenterInfo.innerHTML = `
          <p>lat: ${centerLat} </p>
          <p>lon: ${centerLng} </p>
        `)
}


