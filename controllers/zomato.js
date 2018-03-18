const rp = require('request-promise');

function restaurants(req,res,next){
  const { lat, lon } = req.query;
  rp({
    url: 'https://developers.zomato.com/api/v2.1/search',
    qs: { lat: lat, lon: lon, start: 0, count: 100 },
    headers: {
      'user-key': process.env.ZOMATO_CLIENT_KEY
    },
    json: true
  })
    .then(response => res.json(response))
    // .then(() => console.log(process.env.ZOMATO_CLIENT_KEY))
    .catch(next);
}

module.exports = {
  restaurants
};
