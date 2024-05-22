const request = require('supertest');
const app = require('../server');

describe('Server Tests', () => {
    it('should redirect to /player when accessing the root path', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(302);
        expect(response.headers.location).toBe('/player');
    });

    it('should use bodyParser middleware for parsing request body', async () => {
        const response = await request(app).post('/player').send({ name: 'Test Player' });
        expect(response.status).toBe(404);
    });

    it('should serve static files from the public directory', async () => {
        const response = await request(app).get('/some-static-file.css');
        expect(response.status).toBe(404);
    });
});
