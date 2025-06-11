import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const user_id = localStorage.getItem("user_id");

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                const res = await axios.get("http://localhost:5000/api/order-history", {
                    params: { user_id }
                });
                setOrders(res.data);
            } catch (err) {
                setOrders([]);
            }
            setLoading(false);
        };
        if (user_id) fetchOrders();
    }, [user_id]);

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-16 text-center">
                <h1 className="text-3xl font-bold text-[#3e2723] mb-6">Order History</h1>
                <p className="text-gray-600 mb-8">Loading...</p>
            </div>
        );
    }

    if (!orders.length) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-16 text-center">
                <h1 className="text-3xl font-bold text-[#3e2723] mb-6">Order History</h1>
                <p className="text-gray-600 mb-8">You have no past orders.</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-[#3e2723] mb-8">Order History</h1>
            {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-[#3e2723]">Order #{order.id.slice(0, 8)}</span>
                        <span className="text-sm text-gray-600">{new Date(order.created_at).toLocaleString()}</span>
                        <span className="text-sm px-2 py-1 rounded bg-[#e4c9a7] text-[#3e2723]">{order.status}</span>
                    </div>
                    <div>
                        {order.items.map((item) => (
                            <div key={item.id} className="flex items-center py-2 border-b border-gray-100 last:border-0">
                                <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md">
                                    <img
                                        src={item.image_url || "https://via.placeholder.com/100x100?text=No+Image"}
                                        alt={item.name}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div className="ml-4 flex-1">
                                    <div className="flex justify-between">
                                        <span className="font-medium">{item.name}</span>
                                        <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                                        <span className="text-sm text-gray-600">₱{item.unit_price}</span>
                                        <span className="text-sm text-gray-600">Subtotal: ₱{item.subtotal}</span>
                                    </div>
                                    {item.notes && <div className="text-xs text-gray-500">Notes: {item.notes}</div>}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-end mt-4">
                        <span className="font-bold text-[#3e2723]">Total: ₱{order.total_amount}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OrderHistory;