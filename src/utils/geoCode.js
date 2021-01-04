const request = require('request') 

const geoCode = (searchkeys, callback)=> {

    // const searcharray = searchkeys.split(" ") 
    // const searchstring = searcharray.join("%20")  
    //console.log(searchstring)
    const locationurl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +encodeURIComponent(searchkeys)+ '.json?access_token=pk.eyJ1IjoiZ29kc2xheXllciIsImEiOiJja2pmOXBkdncwZnJtMnZudml2dWQ5ZTgzIn0.rBOxDu3cfmufHVngbfSQ8w&limit=1'

    request({url : locationurl, json : true},(error, {body}={}) => {
        if(error) {
            callback("Unable to connect to Location services !", undefined) 
        }else if(body.features.length === 0){
            callback("Unable to find location. Try another search !", undefined)
        }
        else {
        //console.log(response.body.features[0].center[1] + " "+ response.body.features[0].center[0])
        callback(undefined, { lat: body.features[0].center[1],
                              long: body.features[0].center[0],
                              name : body.features[0].place_name})
        }
    })
}

module.exports = geoCode