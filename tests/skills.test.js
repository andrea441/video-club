const request = require('supertest');
const app = require('../app');

describe('Skill API', () => {
  it('should create a new skill', async () => {
    const res = await request(app)
      .post('/skills')
      .send({
        description: 'JavaScript Development',
        level: 'Advanced'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Habilidad creada correctamente');
    expect(res.body.obj._description).toBe('JavaScript Development');
    expect(res.body.obj._level).toBe('Advanced');
  });

  it('should list all skills', async () => {
    const res = await request(app).get('/skills/1');

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Lista de habilidades');
    expect(res.body.obj).toHaveProperty('docs');
  });

  it('should get a single skill by ID', async () => {
    const res = await request(app).get('/skills/1');

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Habilidad con el id 1');
    expect(res.body.obj).toHaveProperty('_id', '1');
  });

  it('should replace an existing skill', async () => {
    const res = await request(app)
      .put('/skills/1')
      .send({
        description: 'Python Development',
        level: 'Intermediate'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Se reemplazó la habilidad');
    expect(res.body.obj._description).toBe('Python Development');
    expect(res.body.obj._level).toBe('Intermediate');
  });

  it('should update an existing skill', async () => {
    const res = await request(app)
      .patch('/skills/1')
      .send({
        level: 'Expert'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Se actualizó la habilidad');
    expect(res.body.obj._level).toBe('Expert');
  });

  it('should delete a skill', async () => {
    const res = await request(app).delete('/skills/1');

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Habilidad eliminada correctamente');
  });
});
