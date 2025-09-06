import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/authContext';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/cart/${user.id}`);
        if (response.ok) {
          const data = await response.json();
          setCartItems(data.items);
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchCartItems();
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center text-gray-600">Your cart is empty</div>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.product._id}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold">{item.product.name}</h3>
                  <p className="text-gray-600">
                    Quantity: {item.quantity}
                  </p>
                </div>
              </div>
              <div className="text-xl font-bold">
                ₹{parseFloat(item.product.price.$numberDecimal).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
