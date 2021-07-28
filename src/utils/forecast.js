const request = require ("postman-request");
const getWeather = (city, callback) => {
    
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8f9c0d46fafbc1ee8f89e3aa08c3fd8f`
   
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