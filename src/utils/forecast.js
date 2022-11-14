const request = require('request');

const forecast = (lat,long,callback)=>{

    const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&appid=eabdf96a9b399d972d310820555d7702&units=metric';
    request({url : url , json : true},(error,response)=>{
        if(error){
            callback('unable to access the api...',undefined)
        }
        else if(response.body.error){
            callback("Can't forecast data",undefined);
        }
        else{
            callback(undefined,{
                temp : response.body.main.temp,
                feels_temp : response.body.main.feels_like,
                des : response.body.weather[0].description
            })
        }
    })
}


module.exports = forecast;