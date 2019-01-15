const request = require('superagent');

request
  .get('https://rickandmortyapi.com/api/character/')
  .then(res => {
    return res.body.results
      .map(character => character.origin.url)
      .filter(originUrl => originUrl !== '');
    // or console.log(res.body.results[0]) to return the first element in the array
  })
  .then(originUrls => {
    return Promise.all(originUrls.map(url => {
      // -> request.get(url)
      return request.get(url);
    }));
  })
  .then(originRess => originRess.map(originRes => originRes.body))
  .then(origins => console.log(origins));

