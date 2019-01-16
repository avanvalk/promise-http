const request = require('supertest');
const app = require('../lib/app');

describe('app', () => {
  it('has a tester route', () => {
    return request(app)
      // add .post and .set
      .get('/tester')
      .query({ name: 'ryan' })
      .then(res => {
        expect(res.body).toEqual({ hi: 'there ryan' });
      });
  });
});
