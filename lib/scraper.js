const axios = require('axios');
const getProviders = require('./getProviders');
const movieList = require('./movies');

const baseUrl = 'https://apis.justwatch.com/content/';
let providers = [];

// kickstart a Promise chain to retrieve all movie IDs we'll need
const fetchAllMovieIDs = (movies) => {
  return Promise.all(movies.map(movie => fetchMovieID(movie)));
};

// kickstart a Promise chain to retrieve all streaming offers
const fetchAllOffers = (movies) => {
  return Promise.all(movies.map(movie => fetchMonetizationOptions(movie)));
};

// fetch an ID for each movie that can be applied to the movieList objects
const fetchMovieID = async (movie) => {
  // create request endpoint
  const movieIDRequestUrl = baseUrl + 'urls?include_children=true&path=%2Fus%2Fmovie%2F' + movie.key;

  // wait for request to return a response
  const response = await axios.get(movieIDRequestUrl)

  // retrieve ID from response and append to its respective 'movie'
  movie.id = response.data.object_id;

  // resolve this Promise by returning the modified movie object
  return Promise.resolve(movie);
};

const fetchMonetizationOptions = async (movie) => {
  // create request endpoint
  const services = [];
  const monetizationOptionsUrl = baseUrl + 'titles/movie/' + movie.id + '/locale/en_US';

  // wait for request to return a response
  const response = await axios.get(monetizationOptionsUrl);

  // retrieve all offers and filter ones that do not have a retail_price
  const offers = response.data.offers;
  const streamingOffers = offers.filter((offer) => {
    return offer['retail_price'] == undefined
  });

  // match up the remaining offers with their provider
  for (let i in streamingOffers) {
    const service = {};

    // for each streaming offer, match it up to the ID in the providers array
    for (let j in providers) {
      if (providers[j].id === streamingOffers[i].provider_id) {
        // does it already exist in services?
        const existingProvider = services.find(el => el.id === providers[j].id);
        if (!existingProvider) {
          service.id = providers[j].id;
          service.name = providers[j].name;
          service.iconUrl = providers[j].iconUrl;
          service.href = streamingOffers[i].urls.standard_web;

          services.push(service);
        }
      }
    }
  }

  // append offers to their respective 'movie'
  movie.services = services;

  // resolve this Promise by returning the modified movie object
  return Promise.resolve(movie);
}

const getResults = async () => {
  providers = await getProviders();

  const movies = await fetchAllMovieIDs(movieList)
    .then(data => {
      return data;
    });

  const offers = await fetchAllOffers(movies)
    .then(data => {
      return data;
    });

  return {
    movies: [...movies]
  };
};

module.exports = getResults;
