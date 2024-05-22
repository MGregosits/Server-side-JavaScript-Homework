const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Player = require('../models/player');
const Mouse = require('../models/mouse')
const playerMiddleware = require('../middleware/create-player');

const app = express();

// Middleware to parse the request body
app.use(bodyParser.json());

// Mounting the middleware
app.post('/test', playerMiddleware, (req, res) => res.send('success'));

describe('Player Creation Middleware', () => {
    beforeAll(async () => {
        // Connect to the in-memory MongoDB server
        await mongoose.connect('mongodb://localhost:27017/testDB', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    beforeEach(async () => {
        // Create mock mouse data
        const mouse1 = await Mouse.create({ name: 'Mouse1', connectivity: 'Wireless', sensor: 'Optical', weight: 0.2 });
        const mouse2 = await Mouse.create({ name: 'Mouse2', connectivity: 'Wired', sensor: 'Laser', weight: 0.3 });

        // Store the created mouse ids for later use
        mouseIds = [mouse1._id, mouse2._id];
    });

    afterEach(async () => {
        // Clean up the Player collection after each test
        await Player.deleteMany({});
        // Clean up the Mouse collection after each test
        await Mouse.deleteMany({});
    });

    afterAll(async () => {
        // Disconnect from MongoDB after all tests are done
        await mongoose.disconnect();
    });

    it('should create a new player', async () => {
        const playerData = {
            name: 'Test Player',
            team: 'Team A',
            mouse: mouseIds[0],
            dpi: 800,
            sensitivity: 1.5,
        };

        const response = await request(app)
            .post('/test')
            .send(playerData)
            .expect(200);

        expect(response.text).toBe('success');

        const player = await Player.findOne({ name: 'Test Player', team: 'Team A' });
        expect(player).toBeTruthy();
    });

    it('should return 400 if any field is missing', async () => {
        const playerData = {
            name: 'Test Player',
            team: 'Team A',
            dpi: 800,
            sensitivity: 1.5,
        };

        const response = await request(app)
            .post('/test')
            .send(playerData)
            .expect(400);

        expect(response.body.message).toBe('All fields are required');
    });

    it('should return 409 if player already exists', async () => {
        const existingPlayer = new Player({
            name: 'Existing Player',
            team: 'Team B',
            mouse: mouseIds[1],
            dpi: 800,
            sensitivity: 1.5,
        });
        await existingPlayer.save();

        const response = await request(app)
            .post('/test')
            .send({
                name: 'Existing Player',
                team: 'Team B',
                mouse: mouseIds[1],
                dpi: 800,
                sensitivity: 1.5,
            })
            .expect(409);

        expect(response.body.message).toBe('Player already exists');
    });

    it('should return 500 if there is a server error', async () => {
        jest.spyOn(Player.prototype, 'save').mockImplementationOnce(() => {
            throw new Error('Database save error');
        });

        const playerData = {
            name: 'Test Player',
            team: 'Team A',
            mouse: mouseIds[0],
            dpi: 800,
            sensitivity: 1.5,
        };

        const response = await request(app)
            .post('/test')
            .send(playerData)
            .expect(500);

        expect(response.body.message).toBe('Failed to create player');
        expect(response.body.error).toBe('Database save error');
    });
});