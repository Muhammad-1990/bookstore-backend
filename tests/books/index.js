const request = require('supertest');

it('should return object', async done => {
  await request(strapi.server) // app server is an instance of Class: http.Server
    .get('/books')
    .expect(200) // Expect response http code 200
  done();
});