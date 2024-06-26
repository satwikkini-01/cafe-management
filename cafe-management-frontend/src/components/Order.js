import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Order = () => {
    const [orders, setOrders] = useState([]);
    const [customerName, setCustomerName] = useState('');
    const [menuItems, setMenuItems] = useState([]);
    const [orderItems, setOrderItems] = useState([{ menu_id: '', quantity: '' }]);

    useEffect(() => {
        fetchOrders();
        fetchMenu();
    }, []);

    const fetchOrders = async () => {
        const res = await axios.get('http://localhost:3000/api/orders');
        setOrders(res.data);
    };

    const fetchMenu = async () => {
        const res = await axios.get('http://localhost:3000/api/menu');
        setMenuItems(res.data);
    };

    const placeOrder = async () => {
        await axios.post('http://localhost:3000/api/order', { customer_name: customerName, menu_items: orderItems });
        fetchOrders();
        setCustomerName('');
        setOrderItems([{ menu_id: '', quantity: '' }]);
    };

    const addOrderItem = () => {
        setOrderItems([...orderItems, { menu_id: '', quantity: '' }]);
    };

    const updateOrderItem = (index, field, value) => {
        const updatedOrderItems = [...orderItems];
        updatedOrderItems[index][field] = value;
        setOrderItems(updatedOrderItems);
    };

    return (
        <div>
            <h2>Orders</h2>
            <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Customer Name" />
            {orderItems.map((item, index) => (
                <div key={index}>
                    <select value={item.menu_id} onChange={(e) => updateOrderItem(index, 'menu_id', e.target.value)}>
                        <option value="">Select Menu Item</option>
                        {menuItems.map(menuItem => (
                            <option key={menuItem.id} value={menuItem.id}>{menuItem.item_name}</option>
                        ))}
                    </select>
                    <input type="number" value={item.quantity} onChange={(e) => updateOrderItem(index, 'quantity', e.target.value)} placeholder="Quantity" />
                </div>
            ))}
            <button onClick={addOrderItem}>Add Another Item</button>
            <button onClick={placeOrder} style={{ margin: '10px' }} >Place Order</button>
            <ul>
                {orders.map(order => (
                    <li key={order.order_id}>{order.customer_name} - {new Date(order.order_date).toLocaleString()}</li>
                ))}
            </ul>
        </div>
    );
};

export default Order;
