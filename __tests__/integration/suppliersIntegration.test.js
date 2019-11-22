const request = require('supertest');
const app = require('.././../src/app');
const truncate = require('../utils/truncate');
const factory = require('../factories');
const { Supplier } = require('../../src/app/models');

let user;

describe('Suppliers integration', () => {
  beforeEach(async () => {
    await truncate();
  });

  const token = async () => {
    user = await factory.create('User', {
      password: '123123',
    });

    const response = await request(app)
      .post('/session')
      .send({ email: user.email, password: '123123' });
    return response.body.token;
  };

  it('Should create a supplier when make request with valid data', async () => {
    const params = {
      name: 'Teste7',
      email: 'teste7@teste.com',
      address: 'R: Teste, 123 - Teste, Teste/TE',
      price_hour: '10000',
      capacity: '100',
    };
    const response = await request(app)
      .post('/suppliers/create')
      .send(params)
      .set('Authorization', `Bearer ${await token()}`);
    expect(response.status).toBe(201);
  });

  it('Should not create a supplier when make request with invalid data', async () => {
    const data = {
      name: 'Teste8',
      email: 'teste8@teste.com',
    };
    const response = await request(app)
      .post('/suppliers/create')
      .send(data)
      .set('Authorization', `Bearer ${await token()}`);
    expect(response.status).toBe(400);
  });

  it('Should list all created suppliers', async () => {
    const response = await request(app)
      .get('/suppliers/list')
      .set('Authorization', `Bearer ${await token()}`);

    expect(response.status).toBe(200);
  });

  it('Should update a supplier when make request with valid data', async () => {
    const params = {
      name: 'Teste9',
      email: 'teste9@teste.com',
      address: 'R: Teste, 123 - Teste, Teste/TE',
      price_hour: '10000',
      capacity: '100',
    };
    const supplier = await Supplier.create(params);

    const data1 = {
      name: 'Lucas Lima',
    };

    const response = await request(app)
      .put(`/suppliers/update/${supplier.id}`)
      .send(data1)
      .set('Authorization', `Bearer ${await token()}`);

    expect(response.status).toBe(201);
  });

  it('Should not update a supplier when make request with invalid data', async () => {
    const params = {
      name: 'Teste0',
      email: 'teste0@teste.com',
      address: 'R: Teste, 123 - Teste, Teste/TE',
      price_hour: '10000',
      capacity: '100',
    };
    const supplier = await Supplier.create(params);

    const data1 = {
      abc: 'Lucas Lima',
    };

    const response = await request(app)
      .put(`/suppliers/update/${supplier.id}`)
      .send(data1)
      .set('Authorization', `Bearer ${await token()}`);

    expect(response.status).toBe(400);
  });

  it('Should delete a supplier when make valid request', async () => {
    const params = {
      name: 'Teste12',
      email: 'teste12@teste.com',
      address: 'R: Teste, 123 - Teste, Teste/TE',
      price_hour: '10000',
      capacity: '100',
    };
    const supplier = await Supplier.create(params);

    const response = await request(app)
      .put(`/suppliers/delete/${supplier.id}`)
      .set('Authorization', `Bearer ${await token()}`);

    expect(response.status).toBe(201);
  });
});
