const weatherForm = document.querySelector("form")
const search = document.querySelector("input")

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const location = search.value
    const content = document.getElementById("main_content")
    console.log(content)
    const message1 = document.getElementById("message1")
    const weather_icon = document.getElementById("weather_icon")
    const temprature = document.getElementById("temprature")
    const feelslike = document.getElementById("feelslike")
    const humidity = document.getElementById("humidity")
    const precip = document.getElementById("precip")
    const weather_description = document.getElementById("weather_description")
    const wind_speed = document.getElementById("wind_speed")
    const wind_dir = document.getElementById("wind_dir")
    const pressure = document.getElementById("pressure")
    const uv_index = document.getElementById("uv_index")
    const visibility = document.getElementById("visibility")
    message1.textContent = "Loading..."
    // weather_icon.src = ""
    // temprature.textContent = ""
    // feelslike.textContent = ""

    fetch("/weather?address=" + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message1.textContent = data.error
            } else {
                message1.textContent = data.location
                if (content.className === "d-none") {
                    content.className = content.className.replace("d-none", "d-block")
                }
                weather_icon.className = "img-thumbnail w-5"
                weather_icon.src = data.weather_icon
                temprature.textContent = data.temprature + "F"
                feelslike.textContent = data.feelslike + "F"
                humidity.textContent = data.humidity + "%"
                precip.textContent = data.precip + "%"
                weather_description.textContent = data.weather_description
                wind_speed.textContent = data.wind_speed + " MPH"
                wind_dir.textContent = data.wind_dir
                pressure.textContent = data.pressure
                uv_index.textContent = data.uv_index
                visibility.textContent = data.visibility + " Miles"
            }
        })
    })
})