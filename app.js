const path = require("path")
const express = require("express")
const hbs = require("hbs")
const getWeather = require("./src/utils/forecast")

const app = express()
const port = process.env.PORT || 3000

app.set("view engine", "hbs")
hbs.registerPartials(path.join(__dirname, "/views/partials"))

app.use(express.static(path.join(__dirname, "/public")))

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Mahmoud"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About me",
        avatar: "../public/img/untitled.jpg",
        name: "Mahmoud"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        message: "How can I help you?",
        name: "Mahmoud"
    })
})

app.get("/weather", (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "You must enter a valid city name"
        })
    }
    getWeather(req.query.address,(latitude, longitude, temperature) => {
        if(latitude == "error"){
            return res.send({
                error: "Unable to find location try another search"
            })
        }
        res.send({
            latitude,
            longitude,
            temperature,
            address: req.query.address
        })
    })
    
   
})

app.get("/help/*", (req, res) => {
    res.render("404", {
        errorMessage: "Article not found",
        name: "Mahmoud",
        title: "404"
    })
})

app.get("*", (req, res) => {
    res.render("404", {
        errorMessage: "Page not found",
        name: "Mahmoud",
        title: "404"
    })
})

app.listen(port, () => {
    console.log(`app is running on port ${port}`)
})