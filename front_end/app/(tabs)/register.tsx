import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { BACKEND_URL } from '@env';

const RegisterScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async () => {
        if (!username || !password) {
            setMessage('Veuillez remplir tous les champs.');
            return;
        }

        try {
            const response = await axios.post(`${BACKEND_URL}/register`, {
                username,
                password,
            });
            setMessage(response.data.message);
        } catch (error :any) {
            console.log(error.message)
            if (error.response && error.response.data.message) {
                setMessage(error.response.data.message);
            } else {
                setMessage('Erreur lors de l\'inscription.');
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Inscription</Text>
            <TextInput
                style={styles.input}
                placeholder="Nom d'utilisateur"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Mot de passe"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button title="S'inscrire" onPress={handleRegister} />
            {message && <Text style={styles.message}>{message}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    message: {
        marginTop: 10,
        textAlign: 'center',
        color: 'red',
    },
});

export default RegisterScreen;