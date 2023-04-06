const nearestStations = document.querySelector('.nearest-results')

export function renderServoList (servos) {
    nearestStations.innerHTML = servos.map(servo => renderServo(servo)).join("")
}

function renderServo (servo) {
    let icons = {
        BP: "https://res.cloudinary.com/dmla1ujpx/image/upload/v1680754277/BP_kcqdy7.png",
        Caltex: "https://res.cloudinary.com/dmla1ujpx/image/upload/v1680754277/caltex_hjng3g.png",
        seven11: "https://res.cloudinary.com/dmla1ujpx/image/upload/v1680754278/seven11_k3dqag.png",
        Shell: "https://res.cloudinary.com/dmla1ujpx/image/upload/v1680754277/shell_bva7s1.png",
        United: "https://res.cloudinary.com/dmla1ujpx/image/upload/v1680754278/united_zadmjo.png",
        default: "https://res.cloudinary.com/dmla1ujpx/image/upload/v1680754277/default_bcwlof.png"
    }
    let iconArr =["BP", "Caltex", "7-Eleven Pty Ltd", "Shell", "United"]
    if(!iconArr.includes(servo[1])){
        servo[1] = "default"
    }else if (servo[1] === "7-Eleven Pty Ltd"){
        servo[1] = "seven11"
    }

    return `
    <a href class="nearest-station-name" data-lat="${servo[4]}" data-lng="${servo[5]}">
        <div class="station-list" data-lat="${servo[4]}" data-lng="${servo[5]}">
            <div class="list-heading-wrapper" data-lat="${servo[4]}" data-lng="${servo[5]}">
                <p class="price">$${servo[6]}</p>
                <p class="bold" data-lat="${servo[4]}" data-lng="${servo[5]}">${servo[2]}</p>  
            </div>
            <div class="station-card-bottom-half">
                <div>
                    <p class="distance" data-lat="${servo[4]}" data-lng="${servo[5]}">${servo[0]}m</p>
                    <p class="address" data-lat="${servo[4]}" data-lng="${servo[5]}">${servo[3]}</p>
                </div>
                <img style="width:auto;height:30px;" src="${icons[servo[1]]}" data-lat="${servo[4]}" data-lng="${servo[5]}">
            </div>
        </div>
    </a>
    `
}