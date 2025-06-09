import React, { useState } from 'react';
import { View, Text, TextInput, Button,TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import { API_URL } from '../config';
export default function AddFood() {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [emoji, setEmoji] = useState('');
    const [price, setPrice] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [stock, setStock] = useState('');

    const handleSubmit = async () => {
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
                setId('');
                setName('');
                setEmoji('');
                setPrice('');
                setDescripcion('');
                setStock('');
            } else {
                Alert.alert("Error", "No se pudo agregar el producto.");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Hubo un problema al conectar con el servidor.");
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Agregar nuevo producto</Text>

            <Text style={styles.label}>ID</Text>
            <TextInput style={styles.input} value={id} onChangeText={setId} placeholder="ID" />

            <Text style={styles.label}>Nombre</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Nombre" />

            <Text style={styles.label}>Emoji</Text>
            <TextInput style={styles.input} value={emoji} onChangeText={setEmoji} placeholder="Emoji" />

            <Text style={styles.label}>Precio</Text>
            <TextInput style={styles.input} value={price} onChangeText={setPrice} keyboardType="numeric" placeholder="Precio" />

            <Text style={styles.label}>Descripción</Text>
            <TextInput
                style={[styles.input, styles.textarea]}
                value={descripcion}
                onChangeText={setDescripcion}
                placeholder="Descripción del producto"
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
            />

            <Text style={styles.label}>Stock</Text>
            <TextInput style={styles.input} value={stock} onChangeText={setStock} keyboardType="numeric" placeholder="Stock" />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Agregar producto</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: '#fdfdfd',
        flexGrow: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center',
    },
    label: {
        marginTop: 12,
        fontSize: 16,
        fontWeight: '500',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    textarea: {
        height: 100,
    },
    buttonContainer: {
        marginTop: 24,
        borderRadius: 8,
        overflow: 'hidden',
    },
    button: {
        backgroundColor: '#6200ee',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 24,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
