const request = require("request")

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6a7c888326b2b4eb662a372b98874387&query=' + encodeURIComponent(latitude) + "," + encodeURIComponent(longitude) + '&units=f'

    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to the weather service!", undefined)
        } else if (body.error) {
            callback("Unable to find location!", undefined)
        } else {
            const currentData = body.current
            const forecast = currentData.weather_descriptions[0] + " : Temperature currently is " + currentData.temperature + ", it feels like " + currentData.feelslike + " and humidity is " + currentData.humidity + "%"
            const weatherData = {
                temprature: currentData.temperature,
                feelslike: currentData.feelslike,
                forecast: forecast
            }
            callback(undefined, weatherData)
        }
    })
}

module.exports = forecast