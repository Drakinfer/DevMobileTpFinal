import { View, StyleSheet, Button } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useSession } from '../context/sessionContext';
import axios from 'axios';

export default function HomeScreen({ navigation } :any) {
  const { session, setSession } = useSession();

  const handleLogout = async () => {
    try {
        await axios.post(`${process.env.BACKEND_URL}/logout`, { sessionId: session?.id });
        setSession(null); // Réinitialisez la session
        navigation.navigate('Login'); // Retournez à la page de connexion
    } catch (error) {
        console.error('Erreur lors de la déconnexion :', error);
    }
};
  return (
        <View  style={styles.titleContainer}>
            <ThemedText style={styles.title}>Bienvenue !</ThemedText>
            <Button title="Se déconnecter" onPress={handleLogout} />
        </View>
    );
  }

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
},
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
