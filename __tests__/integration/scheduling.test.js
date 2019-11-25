const request = require('supertest');
const app = require('../../src/app');
const truncate = require('../utils/truncate');
const factory = require('../factories');
const { Schedulings } = require('../../src/app/models');
const { Supplier } = require('../../src/app/models');

let user;

describe('Scheduling integration', () => {
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

  it('Should create a scheduling when make request it valid data', async () => {
    const data = {
      name: 'Teste7',
      email: 'teste7@teste.com',
      address: 'R: Teste, 123 - Teste, Teste/TE',
      price_hour: '10000',
      capacity: '100',
    };

    const supplier = await Supplier.create(data);

    const params = {
      supplier_id: supplier.id,
      start_date: '2019/11/11',
      end_date: '2019/11/15',
    };
    const response = await request(app)
      .post('/scheduling/create')
      .send(params)
      .set('Authorization', `Bearer ${await token()}`);
    expect(response.status).toBe(201);
  });

  it('Should not create a scheduling when make request it invalid data', async () => {
    const params1 = {
      start_date: '11/11/2019',
      end_date: '15/11/2019',
    };
    const response = await request(app)
      .post('/scheduling/create')
      .send(params1)
      .set('Authorization', `Bearer ${await token()}`);
    expect(response.status).toBe(400);
  });

  it('Should list all created scheduling', async () => {
    const response = await request(app)
      .get('/scheduling/list')
      .set('Authorization', `Bearer ${await token()}`);

    expect(response.status).toBe(200);
  });

  it('Should update a supplier when make request with valid data', async () => {
    const params = {
      user_id: 1,
      supplier_id: 1,
      final_price: '', // Função para calcular preço final
      start_date: '11/11/2019',
      end_date: '15/11/2019',
    };

    const supplier = await Schedulings.create(params);

    const data1 = {
      start_date: '10/11/2019',
    };

    const response = await request(app)
      .put(`/scheduling/update/${supplier.id}`)
      .send(data1)
      .set('Authorization', `Bearer ${await token()}`);

    expect(response.status).toBe(201);
  });

  it('Should not update a scheduling when make request with invalid data', async () => {
    const params = {
      user_id: 1,
      supplier_id: 1,
      final_price: '', // Função para calcular preço final
      start_date: '11/11/2019',
      end_date: '15/11/2019',
    };

    const supplier = await Schedulings.create(params);

    const data1 = {
      abc: '10/11/2019',
    };

    const response = await request(app)
      .put(`/scheduling/update/${supplier.id}`)
      .send(data1)
      .set('Authorization', `Bearer ${await token()}`);

    expect(response.status).toBe(400);
  });

  it('Should delete a supplier when make valid request', async () => {
    const params = {
      user_id: 1,
      supplier_id: 1,
      final_price: '', // Função para calcular preço final
      start_date: '11/11/2019',
      end_date: '15/11/2019',
    };

    const supplier = await Schedulings.create(params);

    const response = await request(app)
      .delete(`/scheduling/delete/${supplier.id}`)
      .set('Authorization', `Bearer ${await token()}`);

    expect(response.status).toBe(201);
  });
});
