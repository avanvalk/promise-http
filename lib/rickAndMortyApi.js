const request = require('superagent');

module.exports = id => {
  return request
    .get(`https://rickandmortyapi.com/api/${id}`)
    .then(res => ({
      name: res.body.name,
      species: res.body.species,
      status: res.body.status
    }));
};
