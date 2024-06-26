const db = require('../models/db');

exports.addMenuItem = (req, res) => {
    const { item_name, item_price } = req.body;
    const countQuery = 'SELECT COUNT(*) AS count FROM menu';
    db.query(countQuery, (err, rows) => {
        if (err) {
            throw err;
        }
        const id = rows[0].count + 1;
        const insertQuery = 'INSERT INTO menu (id, item_name, item_price) VALUES (?, ?, ?)';
        const values = [id, item_name, item_price];

        db.query(insertQuery, values, (err, result) => {
            if (err) {
                throw err;
            }

            res.send('Menu item added.');
        });
    });
};


exports.viewMenu = (req, res) => {
    const sql = 'SELECT * FROM menu';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
};
