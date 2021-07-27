//This is client side JS

const weatherForm = document.querySelector("form")
const userInput = document.querySelector("input")
const showLocation = document.querySelector("#location-paragraph")
const showForecast = document.querySelector("#forecast-paragraph")

weatherForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const location = userInput.value
    showLocation.textContent = "Loading..."
    showForecast.textContent = ""
    const url = `http://localhost:3000/weather?address=${location}`
    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error){
                showLocation.textContent = "Invalid location"
            }else{
                showLocation.textContent = location
                showForecast.textContent =
                `latitude: ${data.latitude} longitude: ${data.longitude} temperature: ${data.temperature}`
            }
            
        })
    })

})