const mongoose = require('mongoose');

//code to connect file to MongoDB
mongoose.connect('mongodb+srv://GroupomaniaAdmin:FDd4bZkqiNLcbQ7@cluster0.oufuxwn.mongodb.net/Groupomania?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));