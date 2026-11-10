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
  users.findAll.mockReset();          // forget calls/behavior from the previous test
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
});
