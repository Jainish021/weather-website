const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

console.log(__dirname)
console.log(path.join(__dirname, "../public"))

const app = express()
const port = process.env.PORT || 3000

// Setup static directory
app.use(express.static(path.join(__dirname, "../public")))

//Setup views engine and its location
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

app.get("", (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Jainish Adesara"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        name: "Jainish Adesara"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        helpText: "This is a help page.",
        title: "Help",
        name: "Jainish Adesara"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Address must be provided."
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        } else {
            forecast(latitude, longitude, (error, { temprature, feelslike, humidity, precip, weather_icon, weather_description, wind_speed, wind_dir, pressure, uv_index, visibility }) => {
                if (error) {
                    return res.send({
                        error: error
                    })
                }

                res.send({
                    location,
                    temprature,
                    feelslike,
                    humidity,
                    precip,
                    weather_icon,
                    weather_description,
                    wind_speed,
                    wind_dir,
                    pressure,
                    uv_index,
                    visibility
                })
            })
        }
    })
})

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        errorMessage: "Help article not found.",
        name: "Jainish Adesara"
    })
})

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        errorMessage: "Page not found",
        name: "Jainish Adesara"
    })
})

app.listen(port, () => {
    console.log("Server is up on port " + port + ".")
})