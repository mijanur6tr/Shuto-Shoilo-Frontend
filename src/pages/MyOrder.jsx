import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ContextStore } from '../context/contextStore';
import { toast } from 'react-toastify';
import { PackageSearch, Truck } from 'lucide-react';

export const MyOrder = () => {
  const { token, url } = useContext(ContextStore);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(url + "/api/order/get-order", {}, {
        headers: { token }
      });
      setData(response.data.data);
    } catch (error) {
      toast.error("Failed to fetch orders");
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-10 py-20">
      <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">My Orders</h2>

      {data.length === 0 ? (
        <div className="text-center text-gray-600">
          <PackageSearch className="mx-auto mb-4 w-10 h-10 text-gray-400" />
          <p className="text-lg">No orders found</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.map((order, index) => (
            <div
              key={index}
              className="bg-white shadow-sm border rounded-xl p-5 transition hover:shadow-md"
            >
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-lg font-medium text-gray-700">Order #{index + 1}</h4>
                <span
                  className={`px-3 py-1 text-sm rounded-full font-medium inline-block
                    ${order.status === "Delivered"
                      ? "bg-green-100 text-green-600"
                      : order.status === "Out For Delivery"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "Product Processing"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-gray-100 text-gray-600"
                    }`}
                >
                  {order.status}
                </span>

              </div>

              <div className="text-sm lg:text-md text-gray-600 flex gap-2 flex-wrap space-y-1 mb-3">
                {order.items.map((item, i) => (
                  <p key={i} className="flex ">
                    <span>&bull; {item.name}</span>
                    <span className="font-medium text-gray-800">× {item.quantity}</span>
                  </p>
                ))}
              </div>

              <div className="flex justify-between items-center mt-4">
                <p className="text-base font-semibold text-gray-800">
                  Total: ${order.amount}
                </p>
                <button onClick={fetchOrders} className="flex items-center gap-1 px-4 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  <Truck className="w-4 h-4" />
                  Track Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
