const request = require('supertest');
const app = require('../app');

describe('Permission API', () => {

  it('should create a new permission', async () => {
    const res = await request(app)
      .post('/permissions')
      .send({
        name: 'Read Articles',
        description: 'Permission to read articles'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Permiso creado correctamente');
  });

  it('should list all permissions', async () => {
    const res = await request(app).get('/permissions/1');

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Lista de permisos');
  });

  it('should get a single permission by ID', async () => {
    const res = await request(app).get('/permissions/1');

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Permiso con el id 1');
  });

  it('should replace an existing permission', async () => {
    const res = await request(app)
      .put('/permissions/1')
      .send({
        name: 'Write Articles',
        description: 'Permission to write articles'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Se reemplazó el permiso');
  });

  it('should update an existing permission', async () => {
    const res = await request(app)
      .patch('/permissions/1')
      .send({
        description: 'Permission to update articles'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Se actualizó el permiso');
  });

  it('should delete a permission', async () => {
    const res = await request(app).delete('/permissions/1');

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Permiso eliminado correctamente');
  });

});
