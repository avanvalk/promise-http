
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/rickAndMortyApi.js');

describe('app', () => {
  it('gets a character by id', () => {
    return request(app)
      .get('/character/1')
      .then(res => {
        expect(res.body).toEqual({
          name: 'Rick Sanchez',
          species: 'Human',
          status: 'Alive'
        });
      });
  });
  it('can post a note to a specific character', () => {
    return request(app)
      .post('/characters')
      .send({ characterId: 1, note: 'My favorite character' })
      .then(() => {
        return request(app)
          .get('/characters/1');
      })
      .then(res => {
        expect(res.status).toEqual(200);
      });
  });
  it('can get a character by id and their note', () => {
    return request(app)
      .post('/characters')
      .send({ characterId: 1, note: 'My favorite character' })
      .then(() => {
        return request(app)
          .get('/characters/1');
      })
      .then(res => {
        expect(res.text).toContain('My favorite character');
      });
  });
});
