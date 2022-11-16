const { supertest } = require('supertest');
const { app } = require('../index.js');

describe('product', () => {
  describe('get product route', () => {
    describe('given the product does not exist ', () => {
      it('should return a 404', async () => {
        const productId = 'product-123';

        await supertest(app).get('/api/allItems').expect(404);
      });
    });
  });
});
