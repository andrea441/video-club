const request = require('supertest');
const app = require('../app');

describe('Column API', () => {

  it('should create a new column', async () => {
    const res = await request(app)
      .post('/columns')
      .send({
        stories: ['story1', 'story2', 'story3'],
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Columna creada correctamente');
  });

  it('should list all columns', async () => {
    const res = await request(app).get('/columns/1');

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Lista de columnas');
  });

  it('should get a single column by ID', async () => {
    const res = await request(app).get('/columns/1');

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Columna con el id 1');
  });

  it('should update an existing column', async () => {
    const res = await request(app)
      .put('/columns/1')
      .send({
        stories: ['updatedStory1', 'updatedStory2'],
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Se actualizó la columna');
  });

  it('should replace an existing column', async () => {
    const res = await request(app)
      .put('/columns/1')
      .send({
        stories: ['replacedStory1', 'replacedStory2'],
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Se reemplazó la columna');
  });

  it('should delete a column', async () => {
    const res = await request(app).delete('/columns/1');

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Columna eliminada correctamente');
  });

});
