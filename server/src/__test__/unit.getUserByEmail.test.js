// const { getUserByEmail } = require('../controllers/auth');
// const jest = require('jest-mock');
// const users = require('../../models/users');
// jest.mock('../../models/users');

// /////////////////////////////////////////////////////////////////////////////////////////////////
// // FUNTIONS
// /////////////////////////////////////////////////////////////////////////////////////////////////

// const validateReturnStructure = function (userInfo) {
//   const isArray = userInfo.length >= 0;
//   const validLength =
//     isArray === true ? Object.keys(userInfo[0]).length === 8 : false;
//   return isArray && validLength;
// };

// // calling express w/fixed value
// const findRequest = (sessionData) => {
//   return {
//     params: { email: sessionData },
//   };
// };

// const findResponse = () => {
//   let res = {};
//   res.status = jest.fn().mockReturnValue(res);
//   res.json = jest.fn().mockReturnValue(res);

//   return res;
// };

// // empty string
// // @@@@@
// // '
// // odd number of single quote
// // odd number of double quote
// /////////////////////////////////////////////////////////////////////////////////////////////////
// // TESTS
// /////////////////////////////////////////////////////////////////////////////////////////////////

// describe('check 404', () => {
//   test('404', async () => {
//     // const req = findRequest('nonregisteredemail@test.com');
//     // const res = findResponse();

//     // const mockGetUserByEmail = jest.fn();

//     // mockGetUserByEmail.mockReturnValue({
//     //   success: false,
//     //   message: 'No user with that email',
//     // });

//     // expect(res.status).toHaveBeenCalledWith(404);
//     // expect(await getUserByEmail(req, res)).toEqual({
//     //   success: false,
//     //   message: 'No user with that email',
//     // });

//     const mokUserData = [{ email: 'test@example.com', name: 'test user' }];

//     users.findAll.mockReturnValue(mockUserData);
//     const req = {
//       params: {
//         email: 'test@example.com',
//       },
//     };

//     const res = {
//       json: jest.fn(),
//       sendStatus: jest.fn(),
//       status: jest.fn(),
//     };

//     await getUserByEmail(req, res);

//     expect(res.json).toHaveBeenCalledWith({
//       where: { email: 'test@example.com' },
//     });

//     expect(res.json).toHaveBeenCalledWith({
//       success: true,
//       user: mockUserData,
//     });
//   });

//   //   test('404', async () => {
//   //     const req = findRequest('');
//   //     const res = findResponse();

//   //     await getUserByEmail(req, res);
//   //     expect(res.status).toHaveBeenCalledWith(404);
// });

// test('404', async () => {
//   const req = findRequest('@@@@@@@@@@@');
//   const res = findResponse();

//   await getUserByEmail(req, res);
//   expect(res.status).toHaveBeenCalledWith(404);
// });

// test('404', async () => {
//   const req = findRequest(`'`);
//   const res = findResponse();

//   await getUserByEmail(req, res);
//   expect(res.status).toHaveBeenCalledWith(404);
// });
// test('404', async () => {
//   const req = findRequest(`'''`);
//   const res = findResponse();

//   await getUserByEmail(req, res);
//   expect(res.status).toHaveBeenCalledWith(404);
// });
// test('404', async () => {
//   const req = findRequest(`"""`);
//   const res = findResponse();

//   await getUserByEmail(req, res);
//   expect(res.status).toHaveBeenCalledWith(404);
// });
// // });

// describe('check 200', () => {
//   test('200', async () => {
//     const req = findRequest('user@test.com');
//     const res = findResponse();
//     await getUserByEmail(req, res);

//     // console.log(res.json(user));
//     expect(res.status).toHaveBeenCalledWith(200);
//   });
// });

// test('returns true if data is an array and first element is an object with 8 properties.', () => {
//   let userInfo = [
//     {
//       id: 11,
//       uuid: '5b85fa7f-061a-4971-be59-66cb7bf154ed',
//       username: 'demo',
//       email: 'demo@demo.com',
//       password: '$2a$10$E7QbSgpFuS10oTCoOSek8uTZ0nqVlgBUA7eZ65jL6xiGksqN1HCKm',
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       inventoryId: null,
//     },
//   ];

//   expect(validateReturnStructure(userInfo)).valueOf(true);
// });

// test('returns false if data is not an array ', () => {
//   let userInfo = {
//     id: 11,
//     uuid: '5b85fa7f-061a-4971-be59-66cb7bf154ed',
//     username: 'demo',
//     email: 'demo@demo.com',
//     password: '$2a$10$E7QbSgpFuS10oTCoOSek8uTZ0nqVlgBUA7eZ65jL6xiGksqN1HCKm',
//     createdAt: new Date(),
//     updatedAt: new Date(),
//     inventoryId: null,
//   };

//   expect(validateReturnStructure(userInfo)).valueOf(false);
// });
