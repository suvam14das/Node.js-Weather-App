const express = require('express')
const path = require('path') 
const hbs = require('hbs')
const geoCode = require('./utils/geoCode')
const currentWeather = require('./utils/currentWeather')

const app = express() 
const port = process.env.PORT || 3000

// Define paths 
const pathToAsset = path.join(__dirname, "../public")
const pathToViews = path.join(__dirname, "../templates/views")
const pathToPartials = path.join(__dirname, "../templates/partials")

// Setting path to static assets 
app.use(express.static(pathToAsset)) 

// Setup handlebars engine and views location 
app.set("view engine", "hbs")
app.set("views", pathToViews)  
hbs.registerPartials(pathToPartials)

// Addressing server calls 
app.get('', (req, res) => {
    res.render('index', {
        title : "Weather App", 
        name : "Suvam Das"
    })
}) 

app.get('/about', (req, res) => {
    res.render('about', {
        title : "About",  
        name : "Suvam Das"
    })
}) 

app.get('/help', (req, res) => {
    res.render('help', {
        title : "Help",
        name : "Suvam Das", 
        helpText : "Help for the Weather App",        
    })
}) 

app.get('/weather', (req, res) => {
    
    if(!req.query.address)
    {
        return res.send({
            error : "Must provide a search term"
        })
    }
    geoCode(req.query.address, (error, data) => {
        if(error)
        return res.send({ error })
        
        currentWeather(data, (error,data) => {
            if(error)
            return res.send({ error })
            
            res.send(data)   
    })
    })
}) 

app.get('/help/*', (req,res) => {
    res.render('404-page', {
        name : "Suvam Das", 
        title : "404-page", 
        errorMessage : "Help article not found"
    })
})

app.get('*', (req,res) => {
    res.render('404-page', {
        name : "Suvam Das", 
        title : "404-page", 
        errorMessage : "Page not found"
    })
})

app.listen(port, () => {
    console.log("Server is up and running at port "+ port) 
})