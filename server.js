const express = require("express")
const app = express()
const cors = require('cors')
const config = require("./config")
const Servo = require("./models/servo.js")

app.set("view engine", "ejs")

app.use(express.json())
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.render("home", { API_KEY: config.maps_key })
})

app.get("/api/stations/all", (req, res) => {
    Servo.findAll().then(servos => res.json (servos.rows))
})

app.get("/api/owners", (req, res) => {
    Servo.findAllOwners().then(servos => res.json(servos))
})

app.get("/api/stations/random", (req, res) => {
    Servo.findOneRandomly().then(randomServo => res.json(randomServo))
})

app.get("/api/stats", (req, res) => {
    Servo.getStats().then(stats => res.json(stats))
})

app.post("/api/stations/bounds", (req, res) => {
    console.log(req.body);
    Servo.findWithinBounds(req.body).then(servos => res.json(servos))
})

app.post("/api/stations/nearest", (req, res) => {
    const { radius } = req.body
    const { center } = req.body
    Servo.findWithinRadius(center, radius).then(servos => res.json(servos))
})

app.listen(config.port, () => {
    console.log(`listening on port ${config.port}`)
})