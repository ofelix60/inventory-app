const validateReturnStructure = function (userInfo) {
  const isArray = userInfo.length >= 0;
  const validLength =
    isArray === true ? Object.keys(userInfo[0]).length === 8 : false;
  return isArray && validLength;
};

function failedTest(testcases) {
  return testcases.every(
    (testcase) => validateReturnStructure(testcase) === false
  );
}

// returns true if data is an array and first element is an object with 8 properties.

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

test('returns false if incorrect number of properties', () => {
  let userInfo = [
    [{}],
    [{ id: 11 }],
    [
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
    ],
    [
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
    ],
  ];

  expect(failedTest(userInfo)).toBe(false);
});

module.exports = { validateReturnStructure, failedTest };
