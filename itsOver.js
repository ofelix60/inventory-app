const users = require('../models/users');

jest.mock('../models/users', () => ({
  findAll: jest.fn(),
}));

exports.getUserByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const userInfo = await users.findAll({
      where: {
        email: email,
      },
    });

    if (userInfo.length) {
      res.sendStatus(200);
      console.log(userInfo);
      return res.json({
        success: true,
        user: userInfo,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'No user with that email',
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

// In your test file:

const users = require('../models/users');
const { getUserByEmail } = require('../controllers/users');

test('getUserByEmail returns the expected data', async () => {
  // Set up the mock data that the findAll method should return
  const mockUserData = [
    {
      email: 'test@example.com',
      name: 'Test User',
    },
  ];
  users.findAll.mockReturnValue(mockUserData);

  // Use the getUserByEmail controller to get the data for the specified email
  const req = {
    params: {
      email: 'test@example.com',
    },
  };
  const res = {
    json: jest.fn(),
    sendStatus: jest.fn(),
    status: jest.fn(),
  };
  await getUserByEmail(req, res);

  // Verify that the controller returns the expected data
  expect(users.findAll).toHaveBeenCalledWith({
    where: {
      email: 'test@example.com',
    },
  });
  expect(res.json).toHaveBeenCalledWith({
    success: true,
    user: mockUserData,
  });
});

////////

const { getUserByEmail } = require('../src/controller/users');
const users = require('../src/models/users');

jest.mock('../src/models/users');

describe('getUserByEmail', () => {
  it('should return user info if user exists', async () => {
    const userInfo = [{ id: 1, email: 'test@example.com', name: 'Test User' }];
    users.findAll.mockResolvedValue(userInfo);

    const req = {
      params: {
        email: 'test@example.com',
      },
    };
    const res = {
      sendStatus: jest.fn(),
      json: jest.fn(),
    };

    await getUserByEmail(req, res);

    expect(res.sendStatus).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      user: userInfo,
    });
  });

  it('should return a 404 error if user does not exist', async () => {
    const userInfo = [];
    users.findAll.mockResolvedValue(userInfo);

    const req = {
      params: {
        email: 'test@example.com',
      },
    };
    const res = {
      status: jest.fn().mockReturnValue({
        json: jest.fn(),
      }),
    };

    await getUserByEmail(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.status().json).toHaveBeenCalledWith({
      success: false,
      message: 'No user with that email',
    });
  });
});
