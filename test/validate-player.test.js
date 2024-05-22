const request = require('supertest');
const express = require('express');
const validateMW = require('../middleware/validate-player');
const mongoose = require('mongoose');
const Mouse = require('../models/mouse');

// Mock the Mouse model
jest.mock('../models/mouse');

const app = express();
app.use(express.json());

// Dummy route to test the middleware
app.post('/test', validateMW, (req, res) => {
    res.status(200).send("Success");
});

describe('Validate Player Middleware', () => {
    const mouseId = new mongoose.Types.ObjectId();

    beforeEach(() => {
        jest.clearAllMocks();
        Mouse.findOne.mockResolvedValue({ _id: mouseId, name: 'ModelX'});
    });

    it('should return 400 if any required field is missing', async () => {
        const res = await request(app)
            .post('/test')
            .send({ name: 'Player1', team: 'TeamA', mouse: 'ModelX', dpi: 1600 });

        expect(res.status).toBe(400);
        expect(res.text).toBe("All fields are required.");
    });

    it('should return 400 if any field has an invalid type', async () => {
        const res = await request(app)
            .post('/test')
            .send({ name: 'Player1', team: 'TeamA', mouse: 'ModelX', dpi: 'sixteen-hundred', sensitivity: 2 });

        expect(res.status).toBe(400);
        expect(res.text).toBe("Invalid data types for one or more fields.");
    });

    it('should return 400 if dpi is out of acceptable range', async () => {
        const res = await request(app)
            .post('/test')
            .send({ name: 'Player1', team: 'TeamA', mouse: 'ModelX', dpi: 50000, sensitivity: 2 });

        expect(res.status).toBe(400);
        expect(res.text).toBe("DPI must be between 100 and 30000.");
    });

    it('should return 400 if sensitivity is out of acceptable range', async () => {
        const res = await request(app)
            .post('/test')
            .send({ name: 'Player1', team: 'TeamA', mouse: 'ModelX', dpi: 1600, sensitivity: 20 });

        expect(res.status).toBe(400);
        expect(res.text).toBe("Sensitivity must be a positive number and reasonable. Maximum sensitivity value is 10. ");
    });

    it('should return 400 if mouse is not found', async () => {
        Mouse.findOne.mockResolvedValue(null);

        const res = await request(app)
            .post('/test')
            .send({ name: 'Player1', team: 'TeamA', mouse: 'Unknown', dpi: 1600, sensitivity: 2 });

        expect(res.status).toBe(400);
        expect(res.text).toBe("Mouse not found.");
    });

    it('should return 500 if an error occurs during mouse lookup', async () => {
        Mouse.findOne.mockRejectedValue(new Error("Database error"));

        const res = await request(app)
            .post('/test')
            .send({ name: 'Player1', team: 'TeamA', mouse: 'ModelX', dpi: 1600, sensitivity: 2 });

        expect(res.status).toBe(500);
        expect(res.text).toBe("An error occurred while processing your request.");
    });

    it('should return 200 if all fields are valid and mouse is found', async () => {
        Mouse.findOne.mockResolvedValue({ _id: mouseId });

        const res = await request(app)
            .post('/test')
            .send({ name: 'Player1', team: 'TeamA', mouse: 'ModelX', dpi: 1600, sensitivity: 2 });

        expect(res.status).toBe(200);
        expect(res.text).toBe("Success");
    });
});