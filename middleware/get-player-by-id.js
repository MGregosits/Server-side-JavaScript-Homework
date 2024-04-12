module.exports = function (req, res, next) {
    // Logic for getting a player entry in the database
    const playerId = req.params.id;
    // Mock data
    const mockPlayers = [
        { id: 1, name: 's1mple', team: 'NaVi', mouse: 'Logitech G Pro X Superlight', dpi: 400, sensitivity: 3.09 },
        { id: 2, name: 'NiKo', team: 'G2', mouse: 'VAXEE Zygen NP-01', dpi: 800, sensitivity: 0.69 },
        { id: 3, name: 'ZywOo', team: 'Vitality', mouse: 'VAXEE Outset AX', dpi: 400, sensitivity: 2.00 }
    ];
    const player = mockPlayers.find(p => p.id === Number(playerId));

    if (!player) {
        return res.status(404).send('Player not found!');
    }

    res.locals.player = player;
    next();
}