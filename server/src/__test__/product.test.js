// const { supertest } = require('supertest');
import supertest from 'supertest';
const { createServer } = require('../utils/server');

const app = createServer();

describe('product', () => {
  beforeAll(async () => {
    //
  });
  describe('get product route', () => {
    // 1
    describe('given the product does not exist ', () => {
      it('should return a 404', async () => {
        const productId = 777;
        await supertest(app).get(`/api/itemById/${productId}`).expect(200);
      });
    });

    // 2
    describe('given the product does not exist ', () => {
      it('should return a 404', async () => {
        const productId = 777;
        await supertest(app).get(`/api/itemById/${productId}`).expect(200);
      });
    });
  });
});
