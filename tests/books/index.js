const request = require('supertest');

it('should return object', async done => {
  await request(strapi.server) // app server is an instance of Class: http.Server
    .get('/books')
    .expect(200) // Expect response http code 200
    .expect('Content-Type', /json/)
    .then(data => {
        expect(typeof data).toBe('object'); // expect the response text
    });
  done();
});