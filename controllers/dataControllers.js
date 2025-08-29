//Importer le medel 
const Data = require('../models/dataModels');

function generateSyntheticWind(temp, humidity, isRaining) {
    let speed = 0;
    let direction = 0;

    if (isRaining) {
        speed = getRandomInRange(15, 35);
    } else if (humidity > 80 && temp < 20) {
        speed = getRandomInRange(5, 15);
    } else if (temp > 28) {
        speed = getRandomInRange(0, 10);
    } else {
        speed = getRandomInRange(3, 20);
    }

    if (isRaining) {
        direction = getRandomInRange(180, 270);
    } else if (temp > 28 && humidity < 50) {
        direction = getRandomInRange(0, 90);
    } else {
        direction = getRandomInRange(0, 360);
    }

    return {
        vitesseVent: parseFloat(speed.toFixed(1)),
        directionVent: Math.round(direction)
    };
}

function getRandomInRange(min, max) {
    return Math.random() * (max - min) + min;
}

//API pour la reception des données
let lastTemperature = null;
let lastHumidite = null;
let lastPluviometrie = null;

exports.postData = async (req, res) => {
 
    try {
        const { temperature, humidite, pluviometrie } = req.body;
        if (temperature !== undefined) lastTemperature = temperature;
        if (humidite !== undefined) lastHumidite = humidite;
        if (pluviometrie !== undefined) lastPluviometrie = pluviometrie;

        if (lastTemperature === null || lastHumidite === null || lastPluviometrie === null) {
            return res.status(200).json({
                message: "Valeurs reçues mais incomplètes!"
            });
        }

        // Génération de données de vent synthétiques
        const { vitesseVent, directionVent } = generateSyntheticWind(lastTemperature, lastHumidite, lastPluviometrie);

        // Sauvegarde en base
        const data = new Data({
            temperature: lastTemperature,
            humidite: lastHumidite,
            pluviometrie: lastPluviometrie,
            vitesseVent: vitesseVent,
            directionVent: directionVent
        });

        const saved = await data.save();

        lastTemperature = null;
        lastHumidite = null;
        lastPluviometrie = null;
        
        // Diffusion en temps réel via Socket.io
        req.io.emit('new-data', saved);
        return res.status(201).json({ message: 'Données reçues avec succès', saved });

    } catch (error) {
        console.error("Erreur enregistrement :", error);
        return res.status(500).json({ message: "Erreur serveur" });
    }
};


exports.getAllDatas = async(req, res) => {
    try{
        const allData = await Data.find().sort({date: -1});
        res.status(200).json(allData);
    }
    catch(error){
        console.error('Erreur lors de la récupération :', error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}

exports.pingServer = (req, res) => {
    res.status(200).send('pong');
}