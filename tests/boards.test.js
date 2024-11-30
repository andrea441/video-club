const request = require('supertest');
const app = require('../app');
const Board = require('../models/board');
describe('Boards API', () => {
  it('should create a new board', async () => {
    const res = await request(app)
      .post('/boards')
      .send({
        columnProductBacklog: 'Product Backlog',
        columnsReleaseBacklog: ['Release Column 1', 'Release Column 2']
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Tablero creado correctamente');
    expect(res.body.obj).toHaveProperty('_columnProductBacklog');
    expect(res.body.obj).toHaveProperty('_columnsReleaseBacklog');
  });

  it('should list all boards', async () => {
    await Board.create({
      _columnProductBacklog: 'Product Backlog 1',
      _columnsReleaseBacklog: ['Release Column 1']
    });
    await Board.create({
      _columnProductBacklog: 'Product Backlog 2',
      _columnsReleaseBacklog: ['Release Column 2']
    });

    const res = await request(app).get('/boards/1');

    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Lista de tableros');
    expect(res.body.obj).toHaveProperty('docs');
    expect(res.body.obj.docs.length).toBeGreaterThan(0);
  });
});
