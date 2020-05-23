const axios = require('axios');

const fetchProviders = () => {
  return new Promise(async (resolve) => {
    const iconRequestUrl = 'https://apis.justwatch.com/content/providers/locale/en_US'
    const response = await axios.get(iconRequestUrl);

    const providers = parseProviders(response.data);

    return resolve(providers);
  });
};

const parseProviders = (data) => {
  const providerArr = [];

  for (let i in data) {
    // create a new provider object; append 's100' for a square 100x100 image
    const provider = {};
    provider.name = data[i].clear_name;
    provider.iconUrl = `https://images.justwatch.com${data[i].icon_url.replace('{profile}','s100')}`;
    provider.id = data[i].id;

    // push to array of total providers
    providerArr.push(provider);
  }

  return providerArr;
};

const getProviders = async () => {
  const providers = await fetchProviders()
    .then(data => {
      return data;
    });

  return providers;
}

module.exports = getProviders;
