const request = require('request');

const forecast = (lat, long, callback) => {
  const url = `https://api.darksky.net/forecast/3691de9225456ebfc9913aec5164c888/${lat},${long}`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather services!', undefined);
    } else if (body.error) {
      callback('Unable to find Location', undefined);
    } else {
      const data = `${body.daily.data[0].summary}. It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain`;
      callback(undefined, data);
    }
  });
};

module.exports = forecast;
