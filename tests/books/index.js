const request = require('supertest');

it('should return 0 books', async done => {
  const expected = 0;
  expect(
    await strapi.query('books').count()
  ).toBe(expected);
  done();
});