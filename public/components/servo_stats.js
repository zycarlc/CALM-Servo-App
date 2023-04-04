import { fetchServoStats } from "../servo_api.js"

const statsSection = document.querySelector('.stats')

export function renderServoTable(servos) {
    console.log(servos);
    statsSection.innerHTML = `
        <div class="stats-list">
            <div class="heading-wrapper">
                <i class="fa-solid fa-signal fa-lg"></i>
                <h3>Stats</h3>
            </div>
            <p>Total stations: ${servos.total_stations}</p>
            <p>Total owners: ${servos.total_owners}</p>
            <table>
            ${servos.owners.map(servo => renderServo(servo)).join("")}
            </table>
    </div>
    `
}

function renderServo(servo) {
    return `
    <tr>
        <td>${servo.owner}</td>
        <td>${servo.total}</td>
    </tr>
    `
}

fetchServoStats()
    .then(res => { 
        renderServoTable(res)
    })