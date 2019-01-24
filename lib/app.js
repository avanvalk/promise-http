const { parse } = require('url');
const { getCharacter, getCharacters } = require('./rickAndMortyApi');
const bodyParser = require('./bodyParser');
const notes = {};

module.exports = (req, res) => {
  const url = parse(req.url, true);
  if(req.method === 'POST' && url.pathname === '/characters') {
    bodyParser(req)
      .then(body => {
        const id = body.characterId;
        const note = body.note;
        if(notes[id]) {
          notes[id].push(note);
        } else {
          notes[id] = [note];
        }
        res.statusCode = 204;
        res.end();
      });
  }
  else if(url.pathname.includes('/character/')) {
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
  else if(url.pathname.includes('/characters') && req.method === 'GET') {
    const id = url.pathname.slice(1).split('/')[1];
    const note = notes[id][0];
    getCharacter(id)
      .then(character => {
        res.write(`
      <html>
      <body>
      <ul>
      <li>${character.name}</li>
      <li>${character.status}</li>
      <li>${character.species}</li>
      <li>${note}</li>
      </ul>
      </body>
      </html>
      `);
      res.end();
    })
      .catch (err => {
      res.end(`${err}`);
      });
  } else if(url.pathname.includes('/characters')) {
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
