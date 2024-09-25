import React, { createContext, useContext, useState } from 'react';

// Create Cart Context
const CartContext = createContext();

// Custom hook to use the CartContext
export const useCart = () => useContext(CartContext);

// CartProvider component to wrap the app
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [totalCost, setTotalCost] = useState(0);

    // Function to add item to cart
    const addToCart = (property) => {
        const existingItem = cart.find(item => item.id === property.id);

        if (existingItem) {
            const updatedCart = cart.map(item =>
                item.id === property.id
                    ? { ...item, count: item.count + 1 }
                    : item
            );
            setCart(updatedCart);
        } else {
            setCart([...cart, { ...property, count: 1 }]);
        }

        setTotalCount(totalCount + 1);
        setTotalCost(totalCost + property.price);
    };

    // Function to remove item from cart
    const removeFromCart = (id) => {
        const itemToRemove = cart.find(item => item.id === id);
        if (!itemToRemove) return;

        const updatedCart = cart.filter(item => item.id !== id);
        setCart(updatedCart);

        setTotalCount(totalCount - itemToRemove.count);
        setTotalCost(totalCost - itemToRemove.price * itemToRemove.count);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, totalCount, totalCost }}>
            {children}
        </CartContext.Provider>
    );
};
