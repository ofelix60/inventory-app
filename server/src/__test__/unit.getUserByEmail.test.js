const { getUserByEmail } = require('../controllers/auth');
const jest = require('jest-mock');

/////////////////////////////////////////////////////////////////////////////////////////////////
// FUNTIONS
/////////////////////////////////////////////////////////////////////////////////////////////////

const validateReturnStructure = function (userInfo) {
  const isArray = userInfo.length >= 0;
  const validLength =
    isArray === true ? Object.keys(userInfo[0]).length === 8 : false;
  return isArray && validLength;
};

// calling express w/fixed value
const findRequest = (sessionData) => {
  return {
    params: { email: sessionData },
  };
};

const findResponse = () => {
  const res = { bro: false };
  // res.status = jest.fn().mockReturnValue(res);
  // res.json = jest.fn().mockReturnValue(res);
  // res.userInfo = {
  //   success: '',
  //   user: userInfo,
  // };

  // console.log('yo: ', res.userInfo.mock.results[0].value);
  return res;
};

// empty string
// @@@@@
// '
// odd number of single quote
// odd number of double quote
/////////////////////////////////////////////////////////////////////////////////////////////////
// TESTS
/////////////////////////////////////////////////////////////////////////////////////////////////
// before all
// test('test', async () => {
//   const req = mockRequest('nonregisteredemail@test.com');
//   const res = mockResponse();

//   return getUserByEmail(req, res).then((data) =>
//     expect(res.status).toHaveBeenCalledWith(404)
//   );
//   // expect(res.status).toHaveBeenCalledWith(404);
// });

// const test = getUserByEmail(req,res)

describe('check 404', () => {
  test('404', async () => {
    const req = findRequest('nonregisteredemail@test.com');
    const res = findResponse();

    // const mockGetUserByEmail = jest.fn();

    // mock.mockReturnValue({
    //   success: false,
    //   message: 'No user with that email',
    // });

    console.log('YO', getUserByEmail(req, res).bro);
    // expect(res.status).toHaveBeenCalledWith(404);
    // expect(await getUserByEmail(req, res)).toEqual({
    //   success: false,
    //   message: 'No user with that email',
    // });
  });

  //   test('404', async () => {
  //     const req = findRequest('');
  //     const res = findResponse();

  //     await getUserByEmail(req, res);
  //     expect(res.status).toHaveBeenCalledWith(404);
});

//   test('404', async () => {
//     const req = findRequest('@@@@@@@@@@@');
//     const res = findResponse();

//     await getUserByEmail(req, res);
//     expect(res.status).toHaveBeenCalledWith(404);
//   });

//   test('404', async () => {
//     const req = findRequest(`'`);
//     const res = findResponse();

//     await getUserByEmail(req, res);
//     expect(res.status).toHaveBeenCalledWith(404);
//   });
//   test('404', async () => {
//     const req = findRequest(`'''`);
//     const res = findResponse();

//     await getUserByEmail(req, res);
//     expect(res.status).toHaveBeenCalledWith(404);
//   });
//   test('404', async () => {
//     const req = findRequest(`"""`);
//     const res = findResponse();

//     await getUserByEmail(req, res);
//     expect(res.status).toHaveBeenCalledWith(404);
//   });
// });

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

// describe('returns false if incorrect number of properties', () => {
//   test('returns false if incorrect number of properties', () => {
//     const userInfo = [{}];
//     expect(validateReturnStructure(userInfo)).toBe(false);
//   });
//   test('returns false if incorrect number of properties', () => {
//     const userInfo = [{ id: 11 }];
//     expect(validateReturnStructure(userInfo)).toBe(false);
//   });
//   test('returns false if incorrect number of properties', () => {
//     const userInfo = [
//       {
//         id: 11,
//         uuid: '5b85fa7f-061a-4971-be59-66cb7bf154ed',
//         username: 'demo',
//         email: 'demo@demo.com',
//         password:
//           '$2a$10$E7QbSgpFuS10oTCoOSek8uTZ0nqVlgBUA7eZ65jL6xiGksqN1HCKm',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//         inventoryId: null,
//         test: 'failed',
//       },
//     ];
//     expect(validateReturnStructure(userInfo)).toBe(false);
//   });
//   test('returns true if correct number of properties', () => {
//     const userInfo = [
//       {
//         id: 11,
//         uuid: '5b85fa7f-061a-4971-be59-66cb7bf154ed',
//         username: 'demo',
//         email: 'demo@demo.com',
//         password:
//           '$2a$10$E7QbSgpFuS10oTCoOSek8uTZ0nqVlgBUA7eZ65jL6xiGksqN1HCKm',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//         inventoryId: null,
//       },
//     ];
//     expect(validateReturnStructure(userInfo)).toBe(true);
//   });
// });
