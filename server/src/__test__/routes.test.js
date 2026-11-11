jest.mock('../../models', () => ({
  users: { findAll: jest.fn() },
}));

const request = require('supertest');
const { createServer } = require('../utils/server');

const app = createServer();

const { users } = require('../../models'); // this is the fake from jest.mock above

// A valid registration body; each test breaks one field.
const validUser = {
  email: 'new@example.com',
  password: 'password123',
  username: 'newuser',
};

beforeEach(() => {
  users.findAll.mockReset(); // forget calls/behavior from the previous test
  users.findAll.mockResolvedValue([]); // default: "the DB found no matching rows"
});

describe('GET /api/', () => {
  it('returns 200 (health check)', async () => {
    const res = await request(app).get('/api/');
    expect(res.status).toBe(200);
  });
});

describe('POST /api/register validation', () => {
  it('rejects an invalid email', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({ ...validUser, email: 'not-an-email' });

    expect(res.status).toBe(400);
    expect(res.body.errors.map((e) => e.param)).toContain('email');
  });

  it('rejects a short password', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({ ...validUser, password: '123' });

    expect(res.status).toBe(400);
    expect(res.body.errors.map((e) => e.param)).toContain('password');
  });

  it('rejects a username that is already taken', async () => {
    // Fake DB: any lookup by username finds an existing user; lookups by email find nothing.
    users.findAll.mockImplementation(async ({ where }) =>
      where.username ? [{ id: 1, username: where.username }] : []
    );

    const res = await request(app).post('/api/register').send(validUser);

    expect(res.status).toBe(400);
    expect(res.body.errors.map((e) => e.msg)).toContain(
      'Username already exists.'
    );
  });
});

describe('user data exposure', () => {
  it('no longer serves GET /api/get-users', async () => {
    const res = await request(app).get('/api/get-users');
    expect(res.status).toBe(404);
  });

  it('never asks the DB for password when looking up by email', async () => {
    users.findAll.mockResolvedValue([{ id: 1, email: 'a@b.com' }]);
    await request(app).get('/api/userByEmail/a@b.com');

    expect(users.findAll).toHaveBeenCalledWith(
      expect.objectContaining({ attributes: { exclude: ['password'] } })
    );
  });

  it('never asks the DB for password when looking up by id', async () => {
    users.findAll.mockResolvedValue([{ id: 1, email: 'a@b.com' }]);
    await request(app).get('/api/userById/1');

    expect(users.findAll).toHaveBeenCalledWith(
      expect.objectContaining({ attributes: { exclude: ['password'] } })
    );
  });
});
