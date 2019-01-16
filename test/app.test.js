const request = require('supertest');
const app = require('../lib/app');

describe('app', () => {
  it('has a tester route', () => {
    return request(app)
      // add .post and .set
      .post('/note')
      .send({ name: 'I am a note' })
      .then(res => {
        expect(res.status).toEqual(204);
      });
  });
});
