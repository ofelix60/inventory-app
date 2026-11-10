jest.mock('../../models', () => ({
  users: { findAll: jest.fn() },
}));

const request = require('supertest');
const { createServer } = require('../utils/server');

const app = createServer();

describe('GET /api/', () => {
  it('returns 200 (health check)', async () => {
    const res = await request(app).get('/api/');
    expect(res.status).toBe(200);
  });
});