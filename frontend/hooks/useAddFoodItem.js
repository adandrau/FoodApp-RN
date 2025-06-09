import React, { useState} from 'react';
import { Alert } from 'react-native';
import axios from 'axios';
import { API_URL } from '../config';

export const useAddFoodItem = (setFoods, navigation) => {
  const [form, setForm] = useState({
    id: '',
    name: '',
    emoji: '',
    price: '',
    descripcion: '',
    stock: '',
  });

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setForm({
      id: '',
      name: '',
      emoji: '',
      price: '',
      descripcion: '',
      stock: '',
    });
  };

  const handleSubmit = async () => {
    const { id, name, emoji, price, descripcion, stock } = form;

    if (!id || !name || !emoji || !price || !descripcion || !stock) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }

    const newItem = {
      id: id.trim(),
      name: name.trim(),
      emoji: emoji.trim(),
      price: parseFloat(price),
      descripcion: descripcion.trim(),
      stock: parseInt(stock),
      carrito: 0,
    };

    try {
      const response = await axios.post(`${API_URL}/foods`, newItem);
      if (response.status === 200 || response.status === 201) {
        Alert.alert("Éxito", "Producto agregado correctamente.");
        setFoods(prev => [...prev, response.data]);
        resetForm();
      } else {
        Alert.alert("Error", "No se pudo agregar el producto.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Hubo un problema al conectar con el servidor.");
    }
  };
  return {
    form,
    handleChange,
    handleSubmit,
  };
};
