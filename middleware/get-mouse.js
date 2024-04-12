module.exports = function (req, res, next) {
    // Logic for getting all mouse entry from the database
    const mockMice = [
        { id: 1, name: 'Logitech G Pro Superlight', connectivity: 'Wireless', sensor: 'HERO', weight: '63g' },
        { id: 2, name: 'VAXEE Zygen NP-01', connectivity: 'Wireless', sensor: 'PAW3395', weight: '69g' },
        { id: 3, name: 'VAXEE Outset AX', connectivity: 'Wireless', sensor: 'PAW3395', weight: '73g'}
    ];
    res.locals.mice = mockMice;
    next();
}