// src/Components/Checkout.js
import React, { useState } from 'react';
import { useCart } from '../CartContext'; 
import { useNavigate } from 'react-router-dom'; 
import './Checkout.css';

const Checkout = () => {
    const { cart, totalCount, totalCost } = useCart();
    const [bookingDetails, setBookingDetails] = useState({
        name: '',
        email: '',
        paymentMethod: ''
    });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBookingDetails(prevDetails => ({ ...prevDetails, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Booking Details:', bookingDetails);
        alert('Booking details submitted!');
        setBookingDetails({ name: '', email: '', paymentMethod: '' });
        navigate('/'); // Redirect to home after submission
    };

    const handleUPIPayment = (upiID) => {
        const amount = totalCost.toFixed(2);
        const uri = `upi://pay?pa=${upiID}&pn=YourBusinessName&mc=1234&tid=TRANSACTION_ID&tt=Payment&am=${amount}&cu=INR&url=https://yourwebsite.com`;
        window.open(uri, '_blank');
    };

    return (
        <div className="checkout-container">
            <h2>Checkout</h2>
            {cart.length === 0 ? (
                <p className="empty-cart-message">Your cart is empty. Please add items to your cart before checking out.</p>
            ) : (
                <>
                    <div className="cart-summary">
                        <p>Total Items: {totalCount}</p>
                        <p>Total Cost: ${totalCost.toFixed(2)}</p>
                    </div>
                    <form className="checkout-form" onSubmit={handleSubmit}>
                        <h3>Booking Details</h3>
                        <div className="form-group">
                            <label>Name:</label>
                            <input type="text" name="name" value={bookingDetails.name} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input type="email" name="email" value={bookingDetails.email} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group">
                            <label>Payment Method:</label>
                            <input type="text" name="paymentMethod" value={bookingDetails.paymentMethod} onChange={handleInputChange} required />
                        </div>
                        <button type="submit" className="submit-button">Submit Booking</button>
                    </form>

                    <h3>Choose Payment Method</h3>
                    <div className="payment-options">
                        <button className="pay-button" onClick={() => handleUPIPayment('yourupi@bank')}>
                            <img src="https://static1.howtogeekimages.com/wordpress/wp-content/uploads/2020/11/Google-Pay-hero.png" alt="Google Pay" className="payment-image" />
                            Pay with Google Pay
                        </button>
                        <button className="pay-button" onClick={() => handleUPIPayment('yourupi@paytm')}>
                            <img src="https://etimg.etb2bimg.com/thumb/msid-107323713,width-1200,resizemode-4/.jpg" alt="Paytm" className="payment-image" />
                            Pay with Paytm
                        </button>
                    </div>
                </>
            )}
            <button className="back-button" onClick={() => navigate('/')}>Back to Listings</button>
        </div>
    );
};

export default Checkout;
