const request = require('supertest');
const app = require('../app');

describe('Users API', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/users')
      .send({
        user: 'nuevo_usuario',
        email: 'nuevo@usuario.com',
        password: 'contraseña',
        socialMediaList: [],
        role: 'id_del_rol',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Usuario creado correctamente');
    expect(res.body.obj).toHaveProperty('_user', 'nuevo_usuario');
    expect(res.body.obj).toHaveProperty('_email', 'nuevo@usuario.com');
  });

  it('should return error if user, email, or password is missing', async () => {
    const res = await request(app)
      .post('/users')
      .send({
        user: 'nuevo_usuario',
        email: 'nuevo@usuario.com',
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body.msg).toBe('Todos los campos (user, email, password) son obligatorios');
  });

  it('should list all users', async () => {
    const res = await request(app).get('/users');

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Lista de usuarios');
    expect(res.body.obj).toHaveProperty('docs');
    expect(res.body.obj.docs).toBeInstanceOf(Array);
  });

  it('should get a user by id', async () => {
    const res = await request(app).get('/users/1');

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Usuario con el id 1');
    expect(res.body.obj).toHaveProperty('_user');
  });

  it('should update a user', async () => {
    const res = await request(app)
      .put('/users/1')
      .send({
        user: 'usuario_actualizado',
        email: 'actualizado@usuario.com',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Se actualizó el usuario');
    expect(res.body.obj).toHaveProperty('_user', 'usuario_actualizado');
  });

  it('should replace a user', async () => {
    const res = await request(app)
      .put('/users/replace/1')
      .send({
        user: 'usuario_reemplazado',
        email: 'reemplazado@usuario.com',
        password: 'nuevacontraseña',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Se reemplazó el usuario');
    expect(res.body.obj).toHaveProperty('_user', 'usuario_reemplazado');
  });

  it('should delete a user', async () => {
    const res = await request(app).delete('/users/1');

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Usuario eliminado correctamente');
  });
});
