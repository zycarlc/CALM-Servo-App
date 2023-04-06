// import { fetchServos } from "../servo_api.js"

const nearestStations = document.querySelector('.nearest-results')

export function renderServoList (servos) {
    nearestStations.innerHTML = servos.map(servo => renderServo(servo)).join("")
}

function renderServo (servo) {
    // console.log(servo)

    let iconArr =["BP", "Caltex", "7-Eleven Pty Ltd", "Shell", "United"]
    if(!iconArr.includes(servo[1])){
        servo[1] = "default"
    }else if (servo[1] === "7-Eleven Pty Ltd"){
        servo[1] = "seven11"
    }

    // let nearStation = document.createElement("a")
    // nearStation.textContent = `${servos[3]}`
    // nearestStations.appendChild

    return `
    <a href class="nearest-station-name" data-lat="${servo[4]}" data-lng="${servo[5]}">
        <div class="station-list" data-lat="${servo[4]}" data-lng="${servo[5]}">
            <div class="list-heading-wrapper" data-lat="${servo[4]}" data-lng="${servo[5]}">
                <p data-lat="${servo[4]}" data-lng="${servo[5]}">${servo[2]}</p>  
                <img style="width:auto;height:30px;" src="../icons/100pix/${servo[1]}.png" data-lat="${servo[4]}" data-lng="${servo[5]}">
            </div>
            <p class="distance" data-lat="${servo[4]}" data-lng="${servo[5]}">${servo[0]}m</p>
            <p class="address" data-lat="${servo[4]}" data-lng="${servo[5]}">${servo[3]}</p>
        </div>
    </a>
    `
}