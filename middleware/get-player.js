module.exports = function (req, res, next) {
    // Logic for getting all players from the database

    // Mock data
    const players = [
        { id: 1, name: 's1mple', team: 'NaVi', mouse: 'Logitech G Pro X Superlight', dpi: 400, sensitivity: 3.09 },
        { id: 2, name: 'NiKo', team: 'G2', mouse: 'VAXEE Zygen NP-01', dpi: 800, sensitivity: 0.69 },
        { id: 3, name: 'ZywOo', team: 'Vitality', mouse: 'VAXEE Outset AX', dpi: 400, sensitivity: 2.00 }
    ];
    res.locals.players = players;
    next();
}