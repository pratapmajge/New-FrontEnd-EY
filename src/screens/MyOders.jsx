import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
    const [orderData, setOrderData] = useState(null);

    const fetchMyOrder = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/auth/myOrderData", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: localStorage.getItem('userEmail') })
            });

            const data = await response.json();
            setOrderData(data);
        } catch (error) {
            console.error("Error fetching order data:", error);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <Navbar />
            <div className='container'>
                <div className='row'>
                    {orderData && orderData.orderData ? (
                        orderData.orderData.order_data.slice(0).reverse().map((order, orderIndex) => (
                            <div key={orderIndex}>
                                {order.map((item, itemIndex) => (
                                    <div key={itemIndex}>
                                        {Array.isArray(item) ? (
                                            item.map((foodItem, foodIndex) => (
                                                <div key={foodItem.id} className='col-12 col-md-6 col-lg-3'>
                                                    <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                        <img src={foodItem.img} className="card-img-top" alt={foodItem.name} style={{ height: "120px", objectFit: "fill" }} />
                                                        <div className="card-body">
                                                            <h5 className="card-title">{foodItem.name}</h5>
                                                            <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                <span className='m-1'>{foodItem.qty}</span>
                                                                <span className='m-1'>{foodItem.size}</span>
                                                                <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                                    ₹{foodItem.price}/-
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className='m-auto mt-5' key={itemIndex}>
                                                <strong>Order Date: {new Date(item).toLocaleDateString()}</strong>
                                                <hr />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))
                    ) : (
                        <p>No Orders Found</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
