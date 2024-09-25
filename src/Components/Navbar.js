import React from 'react';
import { Navbar, Nav, Container, Button, Image, NavDropdown } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { useCart } from '../CartContext'; 
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Navbar.css'; 

const NavigationBar = () => {
    const [user] = useAuthState(auth);
    const { cart } = useCart(); 

    const handleLogout = () => {
        auth.signOut();
    };

    return (
        <Navbar expand="lg" bg="primary" variant="dark" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/">Property Rental Platform</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {/* Conditional Home Button */}
                        {user && <Nav.Link as={Link} to="/">Home</Nav.Link>}

                        {user ? (
                            <>
                                <Nav.Link as={Link} to="#">
                                    <Image 
                                        src={user?.photoURL || "https://img.freepik.com/premium-vector/anonymous-user-circle-icon-vector-illustration-flat-style-with-long-shadow_520826-1931.jpg"} 
                                        roundedCircle 
                                        alt={user?.displayName || "User"} 
                                        width="30" 
                                        height="30"
                                        className="d-inline-block align-top"
                                    />
                                </Nav.Link>
                                <Nav.Link as={Link} to="#">{user?.displayName || "User"}</Nav.Link>

                                <NavDropdown
                                    title={
                                        <>
                                            <Image 
                                                src="https://icons.veryicon.com/png/o/miscellaneous/flower-mall-color-icon/shopping-cart-114.png" 
                                                alt="Cart Icon"
                                                width="20"
                                                height="20"
                                                className="cart-icon"
                                            />{' '}
                                            Cart ({cart.length})
                                        </>
                                    }
                                    id="basic-nav-dropdown"
                                >
                                    {cart.length > 0 ? (
                                        cart.map(item => (
                                            <NavDropdown.Item key={item.id} as={Link} to="/cart">
                                                {item.title} - ${item.price} x {item.count}
                                            </NavDropdown.Item>
                                        ))
                                    ) : (
                                        <NavDropdown.Item>No items in cart</NavDropdown.Item>
                                    )}
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item as={Link} to="/cart">View Cart</NavDropdown.Item>
                                </NavDropdown>

                                <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
                            </>
                        ) : (
                            <>
                                <Button variant="outline-light" as={Link} to="/login">Login</Button>
                                <Button variant="outline-light" as={Link} to="/register">Register</Button>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
