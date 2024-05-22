// mouse-view.test.js

const mouseViewMiddleware = require('../middleware/get-mouse'); // Adjust the path as needed
const Mouse = require('../models/mouse'); // Adjust the path to your Mouse model

describe('mouseViewMiddleware', () => {
    let req, res, next;

    beforeEach(() => {
        req = {};
        res = {
            locals: {},
        };
        next = jest.fn();
    });

    it('should fetch mice from the database and set them in res.locals', async () => {
        const mockMice = [{ name: 'Logitech G502' }, { name: 'Razer DeathAdder' }]; // Example mice
        Mouse.find = jest.fn().mockResolvedValue(mockMice);

        await mouseViewMiddleware(req, res, next);
        expect(Mouse.find).toHaveBeenCalled();
        expect(res.locals.mice).toEqual(mockMice);
        expect(next).toHaveBeenCalled();
    });

    it('should handle errors during fetching', async () => {
        const mockError = new Error('Database error');
        Mouse.find = jest.fn().mockRejectedValue(mockError);

        await mouseViewMiddleware(req, res, next);
        expect(next).toHaveBeenCalledWith(mockError);
    });
});
