/* eslint-disable react/jsx-no-undef */

import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from './ContextReducer';
import Modal from '../Modal';
import Cart from '../screens/Cart';

export default function Navbar() {
    const [cartView, setCartView] = useState(false);
    let navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/login");
    };

    const loadCart = () => {
        setCartView(true);
    };

    const items = useCart();
    const isLoggedIn = !!localStorage.getItem("token"); // Check if token exists

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success position-sticky"
                style={{ boxShadow: "0px 10px 20px black", position: "fixed", zIndex: "10", width: "100%" }}>
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link fs-5 mx-3 active" to="/">Home</Link>
                            </li>
                            {isLoggedIn && (  // Show "My Orders" only if logged in
                                <li className="nav-item">
                                    <Link className="nav-link fs-5 mx-3 active" to="/myorders">My Orders</Link>
                                </li>
                            )}
                        </ul>

                        {!isLoggedIn ? (
                            <form className="d-flex">
                                <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                                <Link className="btn bg-white text-success mx-1" to="/signup">Signup</Link>
                            </form>
                        ) : (
                            <div>
                                <div className="btn bg-white text-success mx-2" onClick={loadCart}>
                                    <Badge color="secondary" badgeContent={items.length}>
                                        <ShoppingCartIcon />
                                    </Badge>
                                    Cart
                                </div>

                                {cartView && <Modal onClose={() => setCartView(false)}><Cart /></Modal>}

                                <button onClick={handleLogout} className="btn bg-white text-success">Logout</button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
}
