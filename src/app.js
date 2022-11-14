const express = require('express');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const path = require('path');

const hbs = require('hbs');


const app = express()

const port = 3000 

const publicDirectoryPath = path.join(__dirname,'../public');
const partialsPath = path.join(__dirname,'../templates/partials');

//ssetting up views directory
app.set('views',path.join(__dirname,'../templates/views'));
app.set('view engine','hbs');

hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather app',
        Author: 'Abhishek Gharami'
    })
})

// help page
app.get('/help',(req,res)=>{
    res.render('help',{
        title : 'help page.',
        Author : 'abhishek',
        helptext : 'It is the help page'
    })
})

//about page
app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'About Us',
        Author : 'Abhishek Gharami'
    });
})
//weather page
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        res.send({
            error: 'must provide a address'
        })
    }
    else{
        geocode(req.query.address,(error,{lat,long,placename})=>{
    if(error){
        return res.send({error});
    }
    forecast(lat,long,(error,{temp,feels_temp,des})=>{
        if(error){
            return res.send({error});
        }
        else{
            res.send({
                temp,
                feels_temp,
                des,
                placename
            });
            
        }
    })
})

    }
})
//title page
app.get('/title',(req,res)=>{
    res.send("title page...");
})

//routing error
app.get('/help/*',(req,res)=>{
    res.render('error',{
        title : 'routing error',
        Author : 'Abhishek Gharami'
    });
})


//setting up error page
app.get('*',(req,res)=>{
    res.render('error',{
        title: 'error 404',
        Author : 'Abhishek  Gharami'
    })
})

app.listen(port,()=>{
    console.log("server started....",port);
})