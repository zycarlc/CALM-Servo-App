import { fetchServos } from "../servo_api.js"

const nearestStations = document.querySelector('.nearest')

export function renderServoList (servos) {
    nearestStations.innerHTML = servos.map(servo => renderServo(servo)).slice(0, 10).join("")
}

function renderServo (servo) {
    return `
        <div class="station-list">
            <p>${servo.station_name}</p>
            <p>${servo.station_address}</p>
            <p>${servo.station_owner}</p>
        </div>
    `
}

fetchServos()
    .then(renderServoList);