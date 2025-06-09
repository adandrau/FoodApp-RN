import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useAddFoodItem } from '../hooks/useAddFoodItem';
import { useNavigation } from '@react-navigation/native';

export default function AddFood(props) {
    const navigation = useNavigation();
    const { setFoods } = props;
    const { form, handleChange, handleSubmit } = useAddFoodItem(setFoods, navigation);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Agregar nuevo producto</Text>
            <Text style={styles.label}>ID</Text>
            <TextInput
                style={styles.input}
                value={form.id}
                onChangeText={value => handleChange('id', value)}
                placeholder="ID"
            />
            <Text style={styles.label}>Nombre</Text>
            <TextInput
                style={styles.input}
                value={form.name}
                onChangeText={value => handleChange('name', value)}
                placeholder="Nombre"
            />
            <Text style={styles.label}>Emoji</Text>
            <TextInput
                style={styles.input}
                value={form.emoji}
                onChangeText={value => handleChange('emoji', value)}
                placeholder="Emoji"
            />
            <Text style={styles.label}>Precio</Text>
            <TextInput
                style={styles.input}
                value={form.price}
                onChangeText={value => handleChange('price', value)}
                keyboardType="numeric"
                placeholder="Precio"
            />
            <Text style={styles.label}>Descripción</Text>
            <TextInput
                style={[styles.input, styles.textarea]}
                value={form.descripcion}
                onChangeText={value => handleChange('descripcion', value)}
                placeholder="Descripción del producto"
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
            />
            <Text style={styles.label}>Stock</Text>
            <TextInput
                style={styles.input}
                value={form.stock}
                onChangeText={value => handleChange('stock', value)}
                keyboardType="numeric"
                placeholder="Stock"
            />

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
