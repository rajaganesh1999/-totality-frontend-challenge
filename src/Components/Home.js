// Home.js
import React, { useState } from 'react';
import { useCart } from '../CartContext'; 
import { useNavigate } from 'react-router-dom'; 
import useAuth from '../hooks/useAuth'; // Import custom hook
import './Home.css';

const Home = () => {
    const [properties] = useState([
        {
            id: 1,
            title: "Cozy Cottage",
            description: "A charming cottage in the countryside.",
            price: 120,
            location: "Countryside",
            bedrooms: 2,
            image: "https://img.freepik.com/free-photo/photorealistic-house-with-wooden-architecture-timber-structure_23-2151302711.jpg",
        },
        {
            id: 2,
            title: "Luxury Apartment",
            description: "A modern apartment in the city center.",
            price: 250,
            location: "City Center",
            bedrooms: 3,
            image: "https://img.freepik.com/free-photo/3d-rendering-luxury-modern-living-room-with-fabric-sofa_105762-2186.jpg",
        },
        {
            id: 3,
            title: "Beach House",
            description: "A beautiful house by the beach.",
            price: 300,
            location: "Beachfront",
            bedrooms: 4,
            image: "https://img.freepik.com/free-photo/house-palm-trees-sea_1137-130.jpg",
        },
        {
            id: 4,
            title: "Mountain Retreat",
            description: "A serene retreat in the mountains.",
            price: 150,
            location: "Mountains",
            bedrooms: 2,
            image: "https://img.freepik.com/free-photo/couple-summer-having-relaxing-picnic-day-together_23-2151426035.jpg",
        },
    ]);

    const { addToCart, cart } = useCart();
    const navigate = useNavigate(); 
    const user = useAuth(); // Get user from custom hook
    const [notification, setNotification] = useState('');

    const handleBook = (property) => {
        if (!user) {
            alert("Please log in to book a property.");
            return;
        }
        addToCart(property);
        setNotification(`${property.title} has been added to your cart!`);
        setTimeout(() => setNotification(''), 3000);
    };

    return (
        <div className="home-layout">
            <div className="property-section">
                <header className="hero">
                    <h1>Welcome to the Property Rental Platform</h1>
                    <p>Find your next rental property!</p>
                    <h2>Featured Properties</h2>
                </header>
                
                {notification && <p className="notification">{notification}</p>}

                <div className="property-list">
                    {properties.map((property) => (
                        <div key={property.id} className="property-card">
                            <img src={property.image} alt={property.title} className="property-image" />
                            <h3>{property.title}</h3>
                            <p>{property.description}</p>
                            <p className="property-price">Price: ${property.price} per night</p>
                            <button type="button" className="book-button" onClick={() => handleBook(property)}>
                                Book Now
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="cart-sidebar">
                <h2>Your Cart</h2>
                <ul className="cart-list">
                    {cart.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        cart.map((item) => (
                            <li key={item.id} className="cart-item">
                                <h3>{item.title}</h3>
                                <p>Price: ${item.price} x {item.count}</p>
                            </li>
                        ))
                    )}
                    {cart.length > 0 && (
                        <button className="go-to-cart-button" onClick={() => navigate('/cart')}>
                            Go to Cart
                        </button>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Home;
