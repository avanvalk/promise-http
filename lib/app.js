const { parse } = require('url');
const { 
  getCharacter,
  getCharacters
} = require('./rickAndMortyApi');

module.exports = (req, res) => {
  const url = parse(req.url, true);
  if(url.pathname.includes('/character/')) {
    const id = url.pathname.slice(1).split('/')[1];
    getCharacter(id)
      .then(character => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(character));
      })
      .catch (err => {
        res.statusCode = 500;
        res.end(`Error ${err}`);
      });
  }
  else if(url.pathname.includes('/characters')) {
    getCharacters()
      .then(characters => {
        let html = '';
        characters.map(char => {
          html += `<li> ${char.name} </li>`;
        });
        res.setHeader('Content-Type', 'text/html');
        res.end(`<html><body><ul>${html}</ul></body></html>`);
      })
      .catch (err => {
        res.statusCode = 500;
        res.end(`Error ${err}`);
      });
  }

};
