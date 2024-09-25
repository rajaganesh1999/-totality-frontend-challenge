// src/Components/Cart.js
import React, { useState } from 'react';
import { useCart } from '../CartContext'; 
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase'; // Ensure to import auth
import { useNavigate } from 'react-router-dom'; 
import './Cart.css';
import './Home.css';

const Cart = () => {
    const { cart, removeFromCart, totalCount, totalCost, addToCart } = useCart();
    const [properties] = useState([
        {
            id: 1,
            title: "Cozy Cottage",
            price: 120,
            image: "https://img.freepik.com/free-photo/photorealistic-house-with-wooden-architecture-timber-structure_23-2151302711.jpg",
        },
        {
            id: 2,
            title: "Luxury Apartment",
            price: 250,
            image: "https://img.freepik.com/free-photo/3d-rendering-luxury-modern-living-room-with-fabric-sofa_105762-2186.jpg",
        },
        {
            id: 3,
            title: "Beach House",
            price: 300,
            image: "https://img.freepik.com/free-photo/house-palm-trees-sea_1137-130.jpg",
        },
        {
            id: 4,
            title: "Mountain Retreat",
            price: 150,
            image: "https://img.freepik.com/free-photo/couple-summer-having-relaxing-picnic-day-together_23-2151426035.jpg",
        },
        {
            id: 5,
            title: "Urban Loft",
            price: 350,
            image: "https://img.freepik.com/free-photo/modern-loft-interior-design_1203-1956.jpg",
        },
        {
            id: 6,
            title: "Lake House",
            price: 280,
            image: "https://img.freepik.com/free-photo/beautiful-modern-house-surrounded-by-water_23-2148148379.jpg",
        },
        {
            id: 7,
            title: "City Penthouse",
            price: 500,
            image: "https://img.freepik.com/free-photo/luxury-modern-living-room-with-fabric-sofa_105762-2190.jpg",
        },
        {
            id: 8,
            title: "Countryside Villa",
            price: 400,
            image: "https://img.freepik.com/free-photo/luxury-modern-house-exterior-architecture_105762-2200.jpg",
        }
    ]);

    const [user] = useAuthState(auth); // Get the current user state
    const navigate = useNavigate(); // Initialize navigate

    // If user is not logged in, show a message
    if (!user) {
        return (
            <div className="cart-container">
                <h2>Please log in to view your cart.</h2>
                <button onClick={() => navigate('/login')}>Login</button>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <h2>
                <img 
                    src="https://icons.veryicon.com/png/o/miscellaneous/flower-mall-color-icon/shopping-cart-114.png" 
                    alt="Cart Icon" 
                    className="cart-image"
                />
                Your Cart
            </h2>
            <ul className="cart-list">
                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    cart.map((item) => (
                        <li key={item.id} className="cart-item">
                            <img src={item.image} alt={item.title} className="cart-image" />
                            <div className="cart-details">
                                <h3>{item.title}</h3>
                                <p>Price: ${item.price} x {item.count}</p>
                                <button className="remove-button" onClick={() => removeFromCart(item.id)}>Remove</button>
                            </div>
                        </li>
                    ))
                )}
            </ul>
            {cart.length > 0 && (
                <div className="cart-summary">
                    <p>Total Items: {totalCount}</p>
                    <p>Total Cost: ${totalCost.toFixed(2)}</p>
                    <button 
                        className="checkout-button" 
                        onClick={() => navigate('/checkout')} 
                        disabled={cart.length === 0} // Disable button if cart is empty
                    >
                        Checkout
                    </button>
                </div>
            )}

            <h2>Add More Items</h2>
            <div className="property-list">
                {properties.map((property) => (
                    <div key={property.id} className="property-card">
                        <img src={property.image} alt={property.title} className="property-image" />
                        <h3>{property.title}</h3>
                        <p className="property-price">Price: ${property.price} per night</p>
                        <button className="book-button" onClick={() => addToCart(property)}>Add to Cart</button>
                    </div>
                ))}
            </div>

            {/* Back to Listings Button */}
            <button className="back-button" onClick={() => navigate('/')}>Back to Listings</button>
        </div>
    );
};

export default Cart;
