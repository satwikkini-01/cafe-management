import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Inventory = () => {
    const [inventoryItems, setInventoryItems] = useState([]);
    const [itemName, setItemName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unitPrice, setUnitPrice] = useState('');

    useEffect(() => {
        fetchInventory();
    }, []);

    const fetchInventory = async () => {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/inventory`);
        setInventoryItems(res.data);
    };

    const addInventoryItem = async () => {
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/inventory`, { item_name: itemName, quantity, unit_price: unitPrice });
        fetchInventory();
        setItemName('');
        setQuantity('');
        setUnitPrice('');
    };

    return (
        <div>
            <h2>Inventory</h2>
            <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} placeholder="Item Name" />
            <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" />
            <input type="number" value={unitPrice} onChange={(e) => setUnitPrice(e.target.value)} placeholder="Unit Price" />
            <button onClick={addInventoryItem}>Add Item</button>
            <ul>
                {inventoryItems.map(item => (
                    <li key={item.item_id}>{item.item_name} - {item.quantity} units @ ${item.unit_price}</li>
                ))}
            </ul>
        </div>
    );
};

export default Inventory;