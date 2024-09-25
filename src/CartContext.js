// src/CartContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
    });

    const [totalCount, setTotalCount] = useState(0);
    const [totalCost, setTotalCost] = useState(0);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
        const count = cart.reduce((acc, item) => acc + item.count, 0);
        const cost = cart.reduce((acc, item) => acc + item.price * item.count, 0);
        setTotalCount(count);
        setTotalCost(cost);
    }, [cart]);

    const addToCart = (property) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === property.id);
            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === property.id
                        ? { ...item, count: item.count + 1 }
                        : item
                );
            } else {
                return [...prevCart, { ...property, count: 1 }];
            }
        });
    };

    const removeFromCart = (id) => {
        setCart((prevCart) =>
            prevCart.filter((item) => item.id !== id)
        );
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, totalCount, totalCost }}>
            {children}
        </CartContext.Provider>
    );
};
