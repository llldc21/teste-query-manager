const request = require('supertest');
const app = require('../../src/app');
const truncate = require('../utils/truncate');
const factory = require('../factories');

describe('Authentication', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should authenticate with valid credentials', async () => {
    const user = await factory.create('User', {
      password: '123123',
    });

    const response = await request(app)
      .post('/session')
      .send({ email: user.email, password: '123123' });

    expect(response.status).toBe(200);
  });

  it('shold not authenticate with invalid password', async () => {
    const user = await factory.create('User', {
      password: '123123',
    });

    const response = await request(app)
      .post('/session')
      .send({ email: user.email, password: '123456' });

    expect(response.status).toBe(401);
  });

  it('shold not authenticate with invalid email', async () => {
    const user = await factory.create('User', {});

    const response = await request(app)
      .post('/session')
      .send({ email: 'teste@teste.com', password: user.password });

    expect(response.status).toBe(401);
  });

  it('should return jwt token when authenticated', async () => {
    const user = await factory.create('User', {
      password: '123123',
    });

    const response = await request(app)
      .post('/session')
      .send({ email: user.email, password: '123123' });

    expect(response.body).toHaveProperty('token');
  });

  it('shold be able to acess private routes when authenticated', async () => {
    const user = await factory.create('User', {
      password: '123123',
    });

    const response = await request(app)
      .get('/suppliers/list')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  });

  it('shold not be able to acess private routes without jwt token', async () => {
    const response = await request(app).get('/suppliers/list');
    expect(response.status).toBe(401);
  });

  it('shold not be able to acess private routes with invalid jwt token', async () => {
    const response = await request(app)
      .get('/suppliers/list')
      .set('Authorization', 'Bearer 123456789');

    expect(response.status).toBe(401);
  });
});
