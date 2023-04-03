const express = require("express")
const app = express()
const cors = require('cors')
const config = require("./config")

app.use(express.static("public"))
app.use(express.json())

app.get("/", (req, res) => {
    res.send("yep")
})

app.listen(config.port, () => {
    console.log(`listening on port ${config.port}`)
  })