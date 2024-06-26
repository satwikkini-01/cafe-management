import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Menu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');

    useEffect(() => {
        fetchMenu();
    }, []);

    const fetchMenu = async () => {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/menu`);
        setMenuItems(res.data);
    };

    const addMenuItem = async () => {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/menu`, { item_name: itemName, item_price: itemPrice });
        fetchMenu();
        setItemName('');
        setItemPrice('');
    };


    return (
        <div>
            <h2>Menu</h2>
            <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} placeholder="Item Name" />
            <input type="number" value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} placeholder="Item Price" />
            <button onClick={addMenuItem}>Add Item</button>
            <ul>
                {menuItems.map(item => (
                    <li key={item.id}>{item.item_name} - ${item.item_price}</li>
                ))}
            </ul>
        </div>
    );
};

export default Menu;
