const rp = require('request-promise');

function restaurants(req,res,next){
  const { lat, lon } = req.query;
  rp({
    url: 'https://api.yelp.com/v3/businesses/search',
    qs: { latitude: lat, longitude: lon, categories: 'restaurants'},
    headers: {
      'Authorization': `Bearer ${process.env.YELP_API_KEY}`
    },
    json: true
  })
    .then(response => res.json(response))
    .catch(next);
}

module.exports = {
  restaurants
};
