const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/tp-react-native', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});
const User = mongoose.model('User', userSchema);

const sessionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    active: { type: Boolean, default: true },
});

const Session = mongoose.model('Session', sessionSchema);

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ message: 'L\'utilisateur existe déjà' });
    }


    const newUser = new User({ username, password });
    await newUser.save();
    res.json({ message: 'Vous êtes bien enregistré' });
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    try {
        const user = await User.findOne({ username, password });

        if (!user) {
            return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect' });
        }

        let session = await Session.findOne({ userId: user._id, active: true });

        if (!session) {
            session = new Session({ userId: user._id });
            await session.save();
        }

        res.status(200).json({ 
            message: 'Connexion réussie !', 
            session: { id: session._id, userId: user._id, active: session.active },
        });
    } catch (error) {
        console.error('Erreur de connexion :', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
});

app.post('/logout', async (req, res) => {
    const { sessionId } = req.body;

    if (!sessionId) {
        return res.status(400).json({ message: 'ID de session manquant' });
    }

    try {
        const session = await Session.findById(sessionId);

        if (!session || !session.active) {
            return res.status(400).json({ message: 'Session non valide ou déjà désactivée' });
        }

        session.active = false;
        await session.save();

        res.status(200).json({ message: 'Déconnexion réussie' });
    } catch (error) {
        console.error('Erreur lors de la déconnexion :', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
