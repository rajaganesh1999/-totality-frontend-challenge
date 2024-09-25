// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Registration';
import Navbar from './Components/Navbar'; 
import Home from './Components/Home'; 
import Cart from './Components/Cart'; 
import Checkout from './Components/Checkout'; // Import Checkout
import NotFound from './Components/NotFound'; 
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartProvider } from './CartContext';

function App() {
    const [user] = useAuthState(auth);

    return (
        <CartProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={user ? <Checkout /> : <Navigate to="/login" />} /> {/* Only allow authenticated users */}
                    <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
                    <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </CartProvider>
    );
}

export default App;
