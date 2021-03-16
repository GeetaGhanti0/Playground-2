const path = require('path')

const express = require('express')
const hbs = require('hbs')
const { response } = require('express')

// import util files
const geocode = require('../../weather-app/utils/geocode')
const forecast = require('../../weather-app/utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// define paths for Express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setUp static Directory to serve
app.use(express.static(publicDirectory))


app.get('', (req, res) => {
    res.render('index', {
        title: 'weather',
        name: 'Geeta Ghanti'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name : 'Geeta Ghanti'
    });
})

app.get('/weather', (req, res) => {
    const address_given = req.query.address

    if(!address_given){
        return res.send({
            error: 'you must provide the address'
        })
    }

    geocode(address_given, (error, {latitude, longitude, location:address} = {}) => {
        if(error){
            return res.send({error})
        }
        
        forecast(latitude,longitude,(error, forecastdata) => {
            if(error){
                return res.send(error)
            }       
            res.send({
                location: address_given,
                forecast: forecastdata, 
                address
             })   
    })

})
})

app.get('/products', (req, res) => {
    if(!req.query.search){
      return res.send({
            error: 'you must provide the search product'
        })    
    }
  
    res.send({
        product: []

     })
 })
 

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help',
        message: 'This is a help message',
        name : 'Geeta Ghanti'  
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Geeta Ghanti',
        errorMessage: 'Help article not found'     
    }) 
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not Found',
        name: 'Geeta Ghanti'
    }) 
    })


app.listen(port, () => {
    console.log('server started  on port 3000')
})

