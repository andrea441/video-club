const request = require('supertest');
const app = require('../app');

describe('Retrospective API', () => {
  it('should create a new retrospective', async () => {
    const res = await request(app)
      .post('/retrospectives')
      .send({
        date: '2024-11-01',
        comment: 'Improved team collaboration'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Retrospectiva creada correctamente');
  });

  it('should list all retrospectives', async () => {
    const res = await request(app).get('/retrospectives/1');

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Lista de retrospectivas');
  });

  it('should get a single retrospective by ID', async () => {
    const res = await request(app).get('/retrospectives/1');

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Retrospectiva con el id 1');
  });

  it('should replace an existing retrospective', async () => {
    const res = await request(app)
      .put('/retrospectives/1')
      .send({
        date: '2024-12-01',
        comment: 'Focus on communication'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Se reemplazó la retrospectiva');
  });

  it('should update an existing retrospective', async () => {
    const res = await request(app)
      .patch('/retrospectives/1')
      .send({
        comment: 'Updated retrospective comment'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Se actualizó la retrospectiva');
  });

  it('should delete a retrospective', async () => {
    const res = await request(app).delete('/retrospectives/1');

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Retrospectiva eliminada correctamente');
  });
});
