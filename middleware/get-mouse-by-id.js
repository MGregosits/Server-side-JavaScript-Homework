module.exports = function (req, res, next) {
    // Logic for getting a mouse entry in the database
    const mouseId = req.params.id;
    // Mock data
    const mockMice = [
        { id: 1, name: 'Logitech G Pro Superlight', connectivity: 'Wireless', sensor: 'HERO', weight: 63 },
        { id: 2, name: 'VAXEE Zygen NP-01', connectivity: 'Wireless', sensor: 'PAW3395', weight: 69 },
        { id: 3, name: 'VAXEE Outset AX', connectivity: 'Wireless', sensor: 'PAW3395', weight: 73 }
    ];
    const mouse = mockMice.find(p => p.id === Number(mouseId));

    if (!mouse) {
        return res.status(404).send('Mouse not found!');
    }

    res.locals.mouse = mouse;
    next();
}