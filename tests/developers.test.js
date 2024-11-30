const request = require('supertest');
const app = require('../app');

describe('Developer API', () => {

  it('should create a new developer', async () => {
    const res = await request(app)
      .post('/developers')
      .send({
        name: 'John',
        lastName: 'Doe',
        birthDate: '1990-01-01',
        CURP: 'JODO901010HDFRNR08',
        RFC: 'JODO901010ABC',
        skills: ['JavaScript', 'Node.js'],
        street: 'Main St.',
        number: '123',
        zip: '12345',
        city: 'City',
        state: 'State',
        country: 'Country',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Developer creado correctamente');
  });

  it('should list all developers', async () => {
    const res = await request(app).get('/developers/1');

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Lista de developers');
  });

  it('should get a single developer by ID', async () => {
    const res = await request(app).get('/developers/1');

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Developer con el id 1');
  });

  it('should update an existing developer', async () => {
    const res = await request(app)
      .put('/developers/1') 
      .send({
        name: 'John Updated',
        lastName: 'Doe Updated',
        birthDate: '1991-01-01',
        skills: ['Python', 'Django'],
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Se actualizó al developer');
  });

  it('should replace an existing developer', async () => {
    const res = await request(app)
      .put('/developers/1')
      .send({
        name: 'Jane Updated',
        lastName: 'Doe Updated',
        birthDate: '1992-01-01',
        CURP: 'JADO921001HDFRNR09',
        RFC: 'JADO921001ABC',
        skills: ['Go', 'Golang'],
        street: 'New St.',
        number: '456',
        zip: '67890',
        city: 'New City',
        state: 'New State',
        country: 'New Country',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Se reemplazó el developer');
  });

  it('should delete a developer', async () => {
    const res = await request(app).delete('/developers/1');

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Developer eliminado correctamente');
  });

});
