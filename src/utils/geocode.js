const request = require("request")

const geocode = (address, callback) => {
    const geocodeURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiamFpbmlzaDAyMSIsImEiOiJja3BvZGV5aHg0bmNvMm9ueHM0NGwyZ2p4In0.yKwgCnboa4q2d1Lss3BmXg&limit=1"
    request({ url: geocodeURL, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to location service!", undefined)
        } else if (body.features.length === 0) {
            callback("Unable to find location!", undefined)
        } else {
            latitude = body.features[0].center[1]
            longitude = body.features[0].center[0]
            placeName = body.features[0].place_name

            callback(undefined, {
                latitude,
                longitude,
                location: placeName
            })
        }
    })
}

module.exports = geocode