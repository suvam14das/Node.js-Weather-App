const request = require('request')

const currentWeather = ({name, lat, long},callback) => {

    const weatherurl = 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&units=metric&appid=a8d88442870128db102d7e05dade01af'
    request({url : weatherurl, json : true}, (error, {body}) => {
    
        if(error) { 
            callback("Unable to connect to Weather Services !", undefined) 
        }else if(body.message){                                                        
            callback("Unable to get weather at given location !", undefined)
        }
        else {
            const condition = "Current weather condition is "+ body.weather[0].main + " with temperature "+body.main.temp+"°C"
        callback(undefined, {
                            name,
                            condition : condition 
                            })  

        }
    })
    
}

module.exports = currentWeather