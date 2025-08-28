require('dotenv').config();
const http = require('http');
const app = require('./app');
const connectDB = require('./config/db');
const {initSocket} = require('./socket')

const PORT = process.env.PORT || 5000;

// Connexion à MongoDB
connectDB()
.then(() => {
    const server = http.createServer(app);
    const io = initSocket(server);
    server.listen(PORT, () => {
        console.log(`Serveur lancé sur http://localhost:${PORT}`);
    });
})
.catch((err) => {
  console.error('Impossible de se connecter à MongoDB: ', err);
});
