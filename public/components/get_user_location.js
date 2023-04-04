

export function getUserLocation () {
    return axios.post("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCQCRzCc8azNxpcjGj6UzTooS0Yj8LH8Zo")
        .then(res => res.data.location)
}