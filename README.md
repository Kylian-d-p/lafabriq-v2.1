# lafabriq-v2
Deuxième version du site <a href="https://la-fabriq.com">la-fabriq.com</a>

Cette version n'est pas encore en ligne mais devrait l'être sous peu

Définir ces variables dans un fichier .env à placer dans le dossier racine: 
- `PORT` (integer) Port sur lequel le serveur écoutera
- `DB_NAME` (string) Nom de la base de donnée
- `MYSQL_USER` (string) Nom d'utilisateur pour se connecter à la base de donnée
- `MYSQL_PASSWORD` (string) Mot de passe pour se connecter à la base de donnée
- `MYSQL_HOST` (string) IP de l'hôte de la base de donnée
- `SECRET_SESSION` (string) Chaine de caractère secrète pour la sécurité des sessions
- `ADMIN_PASSWORD` (string) Mot de passe pour se connecter à l'interface d'administration du site
- `ADMIN_USERNAME` (string) Identifiant pour se connecter à l'interface d'administration du site

Pour exécuter et ouvrir le site dans un espace de production, il faut :
- Installer node.js sur votre machine
- Lancer la commande `npm i` ou `npm install` depuis le dossier `/server`
- Exécuter la commande `npm run start` depuis le dossier `/server`
Le site sera alors disponible en local sur le port précisé dans le fichier `.env`
Par exemple, si vous précisez le port 10000, vous pourrez accéder au site en entrant dans votre navigateur l'adresse `http://localhost:10000`

Pour tester le site, vous pouvez entrer les informations d'une base de donnée mysql locale dans le fichier.env
Il est recommandé d'avoir phpmyadmin d'installé (facile avec <a href="https://www.uwamp.com/fr/">UwAmp</a>) pour importer dans cette base de donnée le fichier test_bdd.sql qui vous créera des articles et des catégories afin de voir comment se comporte le site

Pour accéder à l'interface d'administration, accédez à l'adresse `http://localhost:PORT/admin-lf` et entrez les identifiants indiqués dans le fichier `.env`
