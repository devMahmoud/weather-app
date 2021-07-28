const request = require ("postman-request");
const key = require("../../confidential")
const getWeather = (city, callback) => {
    
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
   
    request({url: url, json: true}, (error, respond, body) => {
        
        if(error){
            console.log("Check your internet connection")
        }
        else if(body.message){
            console.log(body.message)
            callback("error")
        }
        else{
            callback(
                body.coord.lon,
                body.coord.lat,
                body.main.temp
            )   
        }  
    })
}

module.exports = getWeather