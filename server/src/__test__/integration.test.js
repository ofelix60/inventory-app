// import supertest from 'supertest';
// const { createServer } = require('../utils/server');

// const app = createServer();

// describe('product', () => {
//   describe('get product route', () => {
//     // 1
//     describe('given the product exists ', () => {
//       it('should return a 200', async () => {
//         const productId = 7;
//         await supertest(app).get(`/api/itemById/${productId}`).expect(200);
//       });
//     });

//     // 2
//     describe('given the product does not exist ', () => {
//       it('should return a 404', async () => {
//         const productId = 777;
//         await supertest(app).get(`/api/itemById/${productId}`).expect(404);
//       });
//     });
//   });
// });

// describe('items', () => {
//   describe('get items route', () => {
//     describe('when app starts items should be visible', () => {
//       it('should return a 200 with all items', async () => {
//         await supertest(app).get(`/api/allItems`).expect(200);
//       });
//     });
//   });
// });
