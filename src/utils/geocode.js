const request = require('request');

const geocode = (addres,callback)=>{

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+addres+'.json?access_token=pk.eyJ1IjoiYWJoaXNoZWtnaGFyYW1pIiwiYSI6ImNsOTVneTN3bjAxaTUzc2xrNHlvYmloNWgifQ.uJbiJV_GI7zi80MwFXEtRA';

    request({url: url,json: true},(error,response)=>{
        if (error){
            callback("can't connect...",undefined)
        }
        else if(response.body.error){
            callback("can't find location ..",undefined)
        }
        else{
            callback(undefined,{
                lat : response.body.features[0].center[0],
                long : response.body.features[0].center[1],
                placename : response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;