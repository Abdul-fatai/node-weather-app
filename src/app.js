const path = require('path');
const express = require('express');
const hbs = require('hbs');
const goecode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDir));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Abdul'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'ABout',
    name: 'Abdulfatai'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat laboriosam quis sit voluptatibus, ut, nisi sint ipsam eum amet dolor, voluptate iste cupiditate? Nostrum quis recusandae porro. Eaque, assumenda? Recusandae!',
    name: 'Abdul'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    });
  }
  goecode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        return res.send({
          forecast: forecastData,
          location,
          address: req.query.address
        });
      });
    }
  );
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Help page not found',
    name: 'Abdul'
  });
});
app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: '404 page not found',
    name: 'Abdul'
  });
});

app.listen(3000, () => {
  console.log('server is running on port' + port);
});
