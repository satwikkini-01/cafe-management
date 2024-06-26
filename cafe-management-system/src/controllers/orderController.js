const db = require('../models/db');

exports.placeOrder = (req, res) => {
    const { customer_name, menu_items } = req.body;
    const sqlOrder = 'INSERT INTO orders (customer_name) VALUES (?)';
    db.query(sqlOrder, [customer_name], (err, result) => {
        if (err) throw err;
        const orderId = result.insertId;
        menu_items.forEach(item => {
            const sqlOrderDetail = 'INSERT INTO order_details (order_id, menu_id, quantity) VALUES (?, ?, ?)';
            db.query(sqlOrderDetail, [orderId, item.menu_id, item.quantity], (err, result) => {
                if (err) throw err;
            });
        });
        res.send('Order placed.');
    });
};

exports.viewOrders = (req, res) => {
    const sql = 'SELECT * FROM orders';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
};
