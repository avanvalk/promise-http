const request = require('superagent');

const getCharacter = id => {
  return request.getCharacter(id);
};

module.exports = {
  getCharacter
};
