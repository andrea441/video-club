const request = require('supertest');
const app = require('../app');

describe('Role API', () => {
  it('should create a new role', async () => {
    const res = await request(app)
      .post('/roles')
      .send({
        name: 'Admin',
        permission: ['READ', 'WRITE', 'DELETE']
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Rol creado correctamente');
    expect(res.body.obj._name).toBe('Admin');
  });

  it('should list all roles', async () => {
    const res = await request(app).get('/roles/1');

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Lista de rols');
    expect(res.body.obj).toHaveProperty('docs');
  });

  it('should get a single role by ID', async () => {
    const res = await request(app).get('/roles/1');

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Rol con el id 1');
    expect(res.body.obj).toHaveProperty('_id', '1');
  });

  it('should replace an existing role', async () => {
    const res = await request(app)
      .put('/roles/1')
      .send({
        name: 'Editor',
        permission: ['READ', 'WRITE']
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Se reemplazó el rol');
    expect(res.body.obj.name).toBe('Editor');
  });

  it('should update an existing role', async () => {
    const res = await request(app)
      .patch('/roles/1')
      .send({
        permission: ['READ', 'EXECUTE']
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Se actualizó el rol');
    expect(res.body.obj.permission).toContain('EXECUTE');
  });

  it('should delete a role', async () => {
    const res = await request(app).delete('/roles/1');

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Rol eliminado correctamente');
  });
});
