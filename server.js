const express = require("express")
const app = express()
const cors = require('cors')
const config = require("./config")
const Servo = require("./models/servo.js")

app.set("view engine", "ejs")
app.use(cors())
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

app.listen(config.port, () => {
    console.log(`listening on port ${config.port}`)
  })