const { getUserById } = require('../controllers/auth');
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

const mockRequest = (sessionData) => {
  return {
    params: { id: sessionData },
  };
};

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

/////////////////////////////////////////////////////////////////////////////////////////////////
// TESTS
/////////////////////////////////////////////////////////////////////////////////////////////////
describe('check', () => {
  test('404', async () => {
    const req = mockRequest('11');
    const res = mockResponse();

    await getUserById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });
  test('200', async () => {
    const req = mockRequest('5b85fa7f-061a-4971-be59-66cb7bf154ed');
    const res = mockResponse();
    await getUserById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });
});

test('returns true if data is an array and first element is an object with 8 properties.', () => {
  let userInfo = [
    {
      id: 11,
      uuid: '5b85fa7f-061a-4971-be59-66cb7bf154ed',
      username: 'demo',
      email: 'demo@demo.com',
      password: '$2a$10$E7QbSgpFuS10oTCoOSek8uTZ0nqVlgBUA7eZ65jL6xiGksqN1HCKm',
      createdAt: new Date(),
      updatedAt: new Date(),
      inventoryId: null,
    },
  ];

  expect(validateReturnStructure(userInfo)).valueOf(true);
});

test('returns false if data is not an array ', () => {
  let userInfo = {
    id: 11,
    uuid: '5b85fa7f-061a-4971-be59-66cb7bf154ed',
    username: 'demo',
    email: 'demo@demo.com',
    password: '$2a$10$E7QbSgpFuS10oTCoOSek8uTZ0nqVlgBUA7eZ65jL6xiGksqN1HCKm',
    createdAt: new Date(),
    updatedAt: new Date(),
    inventoryId: null,
  };

  expect(validateReturnStructure(userInfo)).valueOf(false);
});

describe('returns false if incorrect number of properties', () => {
  test('returns false if incorrect number of properties', () => {
    const userInfo = [{}];
    expect(validateReturnStructure(userInfo)).toBe(false);
  });
  test('returns false if incorrect number of properties', () => {
    const userInfo = [{ id: 11 }];
    expect(validateReturnStructure(userInfo)).toBe(false);
  });
  test('returns false if incorrect number of properties', () => {
    const userInfo = [
      {
        id: 11,
        uuid: '5b85fa7f-061a-4971-be59-66cb7bf154ed',
        username: 'demo',
        email: 'demo@demo.com',
        password:
          '$2a$10$E7QbSgpFuS10oTCoOSek8uTZ0nqVlgBUA7eZ65jL6xiGksqN1HCKm',
        createdAt: new Date(),
        updatedAt: new Date(),
        inventoryId: null,
        test: 'failed',
      },
    ];
    expect(validateReturnStructure(userInfo)).toBe(false);
  });
  test('returns true if correct number of properties', () => {
    const userInfo = [
      {
        id: 11,
        uuid: '5b85fa7f-061a-4971-be59-66cb7bf154ed',
        username: 'demo',
        email: 'demo@demo.com',
        password:
          '$2a$10$E7QbSgpFuS10oTCoOSek8uTZ0nqVlgBUA7eZ65jL6xiGksqN1HCKm',
        createdAt: new Date(),
        updatedAt: new Date(),
        inventoryId: null,
      },
    ];
    expect(validateReturnStructure(userInfo)).toBe(true);
  });
});
