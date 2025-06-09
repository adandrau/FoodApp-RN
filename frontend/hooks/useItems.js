import { API_URL } from '../config';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const useItems = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/foods`, { timeout: 5000 });
      setFoods(response.data);
      setError(null);
    } catch (error) {
      setError(error.message || 'Fetch error');
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchItems();
  }, []);
  
  const handleUpdate = async (product, delta) => {
    const newCarrito = product.carrito + delta;
    const maxCarrito = product.stock + product.carrito;

    if (newCarrito < 0 || newCarrito > maxCarrito) return;

    try {
      await axios.patch(`${API_URL}/foods/${product.id}`, {
        carrito: newCarrito,
        stock: product.stock - delta
      });

      setFoods(prevFoods =>
        prevFoods.map(item =>
          item.id === product.id
            ? { ...item, carrito: newCarrito, stock: product.stock - delta }
            : item
        )
      );
    } catch (err) {
      console.error('Error al actualizar el producto:', err.message);
    }
  };
  const placeOrder = async () => {
  try {
    const itemsToOrder = foods.filter(item => item.carrito > 0);
    await Promise.all(itemsToOrder.map(item =>
      axios.patch(`${API_URL}/foods/${item.id}`, {
        carrito: 0
      })
    ));
    setFoods(prevFoods =>
      prevFoods.map(item =>
        item.carrito > 0 ? { ...item, carrito: 0 } : item
      )
    );
    console.log('Order placed successfully');
    alert('Order placed successfully!');
    return true;
  } catch (err) {
    console.error('Error placing order:', err.message);
    return false;
  }
};
  return { foods, loading, error, handleUpdate, placeOrder, setFoods };
};