# CarolineGomot_7_Groupomania

Groupomania est un site qui est un premier jet de réseau social, créé en ReactJS.

###Téléchargez le repository DEPUIS LA BRANCH_1
, dézippez-le. 

1 ) Dans le terminal de commande, placez-vous dans le dossier backend et exécutez la commande npm install pour installer les dépendances du backend. 

2 ) Ouvrez un autre terminal de commande, placez-vous dans le dossier client et exécutez la commande npm install pour installer les dépendances côté client.

3 ) Création d'un fichier .env dans le backend

dans le dossier backend/config, créez un fichier.env. Les informations à renseigner dedans sont les suivantes : 

PORT=3000


RANDOM_TOKEN_SECRET=<clédetokensouhaitée>


 4 ) Connexion à la base de données :

Les informations de la base de données utilisée pour le développement du site ont été conservées dans les documents et peuvent être utilisées pour tester le site. Elles se trouvent dans le dossier backend/config/db. Vous pouvez modifier les informations dans la fonction mongoose.connect du même fichier directement en effaçant et remplaçant 'mongodb+srv://<nomutilisateur>:<motdepasse>cluster0.oufuxwn.mongodb.net/<nomdatabase>?retryWrites=true&w=majority'.

5 ) Lancement du serveur backend

Depuis le dossier backend dans votre terminal de commande, lancez l'instruction npm start. Le backend se lancera sur le port 3000. 

6 ) Lancement du côté client

Depuis le dossier client dans votre terminal de commande, lancez l'instruction npm start. Le côté client se lancera sur le port 3001. Le site doit se lancer dans votre navigateur à l'adresse http://localhost:3001.
