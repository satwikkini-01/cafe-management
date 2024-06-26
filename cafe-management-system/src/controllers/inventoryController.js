const db = require('../models/db');

exports.addInventoryItem = (req, res) => {
    const { item_name, quantity, unit_price } = req.body;
    const sql = 'INSERT INTO inventory (item_name, quantity, unit_price) VALUES (?, ?, ?)';
    db.query(sql, [item_name, quantity, unit_price], (err, result) => {
        if (err) throw err;
        res.send('Inventory item added.');
    });
};

exports.viewInventory = (req, res) => {
    const sql = 'SELECT * FROM inventory';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
};
