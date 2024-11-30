const request = require('supertest');
const app = require('../app'); // Asegúrate de que este es el archivo principal de tu aplicación.

describe('Sprint API', () => {
  it('should create a new sprint', async () => {
    const res = await request(app)
      .post('/sprints')
      .send({
        backlog: ['Task 1', 'Task 2'],
        toDo: ['Task 3'],
        inProgress: ['Task 4'],
        done: ['Task 5'],
        startDate: '2024-11-01',
        endDate: '2024-11-30'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Sprint creado correctamente');
    expect(res.body.obj._backlog).toEqual(['Task 1', 'Task 2']);
    expect(res.body.obj._startDate).toBe('2024-11-01');
  });

  it('should list all sprints', async () => {
    const res = await request(app).get('/sprints/1'); // Página 1.

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Lista de sprints');
    expect(res.body.obj).toHaveProperty('docs');
  });

  it('should get a single sprint by ID', async () => {
    const res = await request(app).get('/sprints/1');

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Sprint con el id 1');
    expect(res.body.obj).toHaveProperty('_id', '1');
  });

  it('should replace an existing sprint', async () => {
    const res = await request(app)
      .put('/sprints/1')
      .send({
        backlog: ['Task A', 'Task B'],
        toDo: ['Task C'],
        inProgress: [],
        done: ['Task D'],
        startDate: '2024-12-01',
        endDate: '2024-12-31'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Se reemplazó el sprint');
    expect(res.body.obj._backlog).toEqual(['Task A', 'Task B']);
    expect(res.body.obj._endDate).toBe('2024-12-31');
  });

  it('should update an existing sprint', async () => {
    const res = await request(app)
      .patch('/sprints/1')
      .send({
        inProgress: ['Task Updated'],
        done: ['Task E']
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Se actualizó el sprint');
    expect(res.body.obj._inProgress).toEqual(['Task Updated']);
  });

  it('should delete a sprint', async () => {
    const res = await request(app).delete('/sprints/1');

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Sprint eliminado correctamente');
  });
});
