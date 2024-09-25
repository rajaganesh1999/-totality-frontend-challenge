// // src/CartContext.js
// import React, { createContext, useContext, useState } from 'react';

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//     const [cart, setCart] = useState([]);

//     const addToCart = (property) => {
//         setCart((prevCart) => {
//             const itemIndex = prevCart.findIndex(item => item.id === property.id);
//             if (itemIndex > -1) {
//                 const newCart = [...prevCart];
//                 newCart[itemIndex].count += 1; // Increment count if item already exists
//                 return newCart;
//             }
//             return [...prevCart, { ...property, count: 1 }]; // Add new item
//         });
//     };

//     const removeFromCart = (id) => {
//         setCart((prevCart) => prevCart.filter(item => item.id !== id));
//     };

//     const totalCount = cart.reduce((total, item) => total + item.count, 0);
//     const totalCost = cart.reduce((total, item) => total + item.price * item.count, 0);

//     return (
//         <CartContext.Provider value={{ cart, addToCart, removeFromCart, totalCount, totalCost }}>
//             {children}
//         </CartContext.Provider>
//     );
// };

// export const useCart = () => {
//     return useContext(CartContext);
// };


import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        // Retrieve cart from local storage or initialize as empty
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
    });

    const [totalCount, setTotalCount] = useState(0);
    const [totalCost, setTotalCost] = useState(0);

    // Update localStorage whenever the cart changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
        // Recalculate totals when cart updates
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
