const request = require('supertest');
const app = require('../app');

describe('User Stories API', () => {
  it('should create a new user story', async () => {
    const res = await request(app)
      .post('/user-stories')
      .send({
        name: 'Nueva User Story',
        priority: 'Alta',
        size: 5,
        role: 'Desarrollador',
        functionality: 'Añadir funcionalidad X',
        benefit: 'Mejora el rendimiento',
        context: 'Contexto relevante',
        event: 'Cuando el usuario hace X',
        result: 'El sistema debe hacer Y',
        fibonacci: 8,
        approval: true,
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('User Story creada correctamente');
    expect(res.body.obj).toHaveProperty('_name', 'Nueva User Story');
  });

  it('should list all user stories', async () => {
    const res = await request(app).get('/user-stories');

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Lista de User Stories');
    expect(res.body.obj).toHaveProperty('docs');
    expect(res.body.obj.docs).toBeInstanceOf(Array);
  });

  it('should get a user story by id', async () => {
    const res = await request(app).get('/user-stories/1');

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('User Story con el id 1');
    expect(res.body.obj).toHaveProperty('_name');
  });

  it('should update a user story', async () => {
    const res = await request(app)
      .put('/user-stories/1')
      .send({
        name: 'User Story Actualizada',
        priority: 'Media',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Se actualizó la User Story');
    expect(res.body.obj).toHaveProperty('_name', 'User Story Actualizada');
  });

  it('should replace a user story', async () => {
    const res = await request(app)
      .put('/user-stories/replace/1')
      .send({
        name: 'User Story Reemplazada',
        priority: 'Baja',
        size: 3,
        role: 'Tester',
        functionality: 'Corregir error Y',
        benefit: 'Mejora la estabilidad',
        context: 'Contexto para reemplazo',
        event: 'Cuando el sistema falla',
        result: 'El sistema debe reiniciar',
        fibonacci: 5,
        approval: false,
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Se reemplazó la User Story');
    expect(res.body.obj).toHaveProperty('_name', 'User Story Reemplazada');
  });

  it('should delete a user story', async () => {
    const res = await request(app).delete('/user-stories/1');

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('User Story eliminada correctamente');
  });
});
