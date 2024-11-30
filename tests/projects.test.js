const request = require('supertest');
const app = require('../app');

describe('Project API', () => {
  it('should create a new project', async () => {
    const res = await request(app)
      .post('/projects')
      .send({
        name: 'Project A',
        requestDate: '2024-11-01',
        startDate: '2024-11-05',
        description: 'First project',
        projectManager: 'Manager 1',
        productOwner: 'Owner 1',
        developmentTeam: ['Dev 1', 'Dev 2'],
        board: 'Board A'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Proyecto creado correctamente');
  });

  it('should list all projects', async () => {
    const res = await request(app).get('/projects/1');

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Lista de proyectos');
  });

  it('should get a single project by ID', async () => {
    const res = await request(app).get('/projects/1');

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Proyecto con el id 1');
  });

  it('should replace an existing project', async () => {
    const res = await request(app)
      .put('/projects/1')
      .send({
        name: 'Updated Project A',
        requestDate: '2024-11-02',
        startDate: '2024-11-06',
        description: 'Updated description',
        projectManager: 'Updated Manager',
        productOwner: 'Updated Owner',
        developmentTeam: ['Dev 3', 'Dev 4'],
        board: 'Board B'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Se reemplazó el proyecto');
  });

  it('should update an existing project', async () => {
    const res = await request(app)
      .patch('/projects/1')
      .send({
        description: 'Partially updated description'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Se actualizó el proyecto');
  });

  it('should delete a project', async () => {
    const res = await request(app).delete('/projects/1');

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Proyecto eliminado correctamente');
  });
});
