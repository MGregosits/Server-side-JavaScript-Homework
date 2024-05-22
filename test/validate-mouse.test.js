const request = require('supertest');
const express = require('express');
const validateMW = require('../middleware/validate-mouse');

const app = express();
app.use(express.json());

// Dummy route to test the middleware
app.post('/test', validateMW, (req, res) => {
    res.status(200).send("Success");
});

describe('Mouse Validation Middleware', () => {
    it('should return 400 if name is missing', async () => {
        const res = await request(app)
            .post('/test')
            .send({ connectivity: 'Wired', sensor: 'Optical', weight: 120 });

        expect(res.status).toBe(400);
        expect(res.text).toBe("All fields are required.");
    });

    it('should return 400 if connectivity is missing', async () => {
        const res = await request(app)
            .post('/test')
            .send({ name: 'Mouse', sensor: 'Optical', weight: 120 });

        expect(res.status).toBe(400);
        expect(res.text).toBe("All fields are required.");
    });

    it('should return 400 if sensor is missing', async () => {
        const res = await request(app)
            .post('/test')
            .send({ name: 'Mouse', connectivity: 'USB', weight: 120 });

        expect(res.status).toBe(400);
        expect(res.text).toBe("All fields are required.");
    });

    it('should return 400 if weight is missing', async () => {
        const res = await request(app)
            .post('/test')
            .send({ name: 'Mouse', connectivity: 'Wired', sensor: 'Optical' });

        expect(res.status).toBe(400);
        expect(res.text).toBe("All fields are required.");
    });

    it('should return 400 if weight is not a number', async () => {
        const res = await request(app)
            .post('/test')
            .send({ name: 'Mouse', connectivity: 'Wired', sensor: 'Optical', weight: 'heavy' });

        expect(res.status).toBe(400);
        expect(res.text).toBe("All fields are required.");
    });

    it('should return 400 if weight is a negative number', async () => {
        const res = await request(app)
            .post('/test')
            .send({ name: 'Mouse', connectivity: 'Wired', sensor: 'Optical', weight: -10 });

        expect(res.status).toBe(400);
        expect(res.text).toBe("Weight must be a positive number.");
    });

    it('should return 400 if name is not a string', async () => {
        const res = await request(app)
            .post('/test')
            .send({ name: 123, connectivity: 'Wired', sensor: 'Optical', weight: 120 });

        expect(res.status).toBe(400);
        expect(res.text).toBe("Invalid data types for one or more fields.");
    });

    it('should return 400 if connectivity is not a string', async () => {
        const res = await request(app)
            .post('/test')
            .send({ name: 'Mouse', connectivity: 123, sensor: 'Optical', weight: 120 });

        expect(res.status).toBe(400);
        expect(res.text).toBe("Invalid data types for one or more fields.");
    });

    it('should return 400 if sensor is not a string', async () => {
        const res = await request(app)
            .post('/test')
            .send({ name: 'Mouse', connectivity: 'Wired', sensor: 123, weight: 120 });

        expect(res.status).toBe(400);
        expect(res.text).toBe("Invalid data types for one or more fields.");
    });

    it('should return 200 if all fields are valid', async () => {
        const res = await request(app)
            .post('/test')
            .send({ name: 'Mouse', connectivity: 'Wired', sensor: 'Optical', weight: 120 });

        expect(res.status).toBe(200);
        expect(res.text).toBe("Success");
    });
});