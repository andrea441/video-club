const request = require('supertest');
const app = require('../app');

describe('Release API', () => {
  it('should create a new release', async () => {
    const res = await request(app)
      .post('/releases')
      .send({
        version: '1.0.0',
        retrospective: ['Great sprint', 'Improved communication'],
        sprints: ['Sprint 1', 'Sprint 2']
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Release creada correctamente');
  });

  it('should list all releases', async () => {
    const res = await request(app).get('/releases/1');

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Lista de releases');
  });

  it('should get a single release by ID', async () => {
    const res = await request(app).get('/releases/1');

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Release con el id 1');
  });

  it('should replace an existing release', async () => {
    const res = await request(app)
      .put('/releases/1')
      .send({
        version: '2.0.0',
        retrospective: ['Better planning'],
        sprints: ['Sprint 3', 'Sprint 4']
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Se reemplazó la release');
  });

  it('should update an existing release', async () => {
    const res = await request(app)
      .patch('/releases/1')
      .send({
        retrospective: ['Updated retrospective item']
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Se actualizó la release');
  });

  it('should delete a release', async () => {
    const res = await request(app).delete('/releases/1');

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Release eliminada correctamente');
  });
});
