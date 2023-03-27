-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : dim. 26 mars 2023 à 18:51
-- Version du serveur : 10.5.18-MariaDB-0+deb11u1
-- Version de PHP : 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `lafabriq_bdd`
--

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` tinytext NOT NULL,
  `display_name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`id`, `name`, `display_name`) VALUES
(1, 'mobilier', 'Mobilier'),
(2, 'decoration', 'Décoration'),
(3, 'brocante', 'Brocante');

-- --------------------------------------------------------

--
-- Structure de la table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `available` tinyint(1) NOT NULL,
  `price` int(11) DEFAULT NULL,
  `category` int(11) NOT NULL DEFAULT 1,
  `description` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Déchargement des données de la table `products`
--

INSERT INTO `products` (`id`, `title`, `available`, `price`, `category`, `description`) VALUES
(1, 'Table', 0, 1490, 1, 'Table en Teck :<br />\r\nLongueur : 200cm<br />\r\nLargeur : 100cm<br />\r\nHauteur : 76cm'),
(6, 'Table', 0, 1990, 1, 'Table bois massif recyclée<br />\r\nPlus de 60 ans d âge <br />\r\n225cm x 82cm<br />\r\nHauteur 76 cm<br />\r\nEpaisseur 6.5cm'),
(7, 'Lampe', 0, 299, 2, 'Support en bois flotté <br />\r\nTronc en chêne <br />\r\nPied en teck'),
(9, 'Lampe', 0, 89, 2, ''),
(10, 'Table', 0, 890, 1, 'Bois massif<br />\r\nPied acier blanc<br />\r\n200x80cm<br />\r\nHauteur 76 cm<br />\r\nEpaisseur 4.5 cm'),
(11, 'Lampe', 0, 189, 3, ''),
(12, 'Table basse', 0, 190, 1, '132×54 cm au plus large <br />\r\nHauteur 35 cm<br />\r\nEpaisseur 4 cm<br />\r\n'),
(13, 'Table basse', 0, 190, 1, 'Longueur : 1.20m<br />\r\nLargeur 0.50cm<br />\r\nEpaisseur 4.5cm<br />\r\nChêne massif'),
(14, 'Lampe', 0, 159, 2, ''),
(15, 'Table salon', 1, 1190, 1, 'Table en chêne massif<br />\r\nLongueur 200cm<br />\r\nLargeur 81 cm<br />\r\nEpaisseur 5.5cm<br />\r\nHauteur 76 cm'),
(16, 'Table', 0, 690, 1, 'Longueur : 180cm<br />\r\nLargeur : 90cm'),
(17, 'Guéridon', 1, 79, 1, ''),
(18, 'Console', 1, 490, 1, ''),
(19, 'Table basse', 1, 190, 1, ''),
(20, 'Table basse', 1, 450, 1, ''),
(21, 'Table basse', 1, 690, 1, ''),
(23, 'Console', 1, 390, 1, ''),
(24, 'Table basse', 0, 690, 1, ''),
(25, 'Table basse', 1, 1990, 1, ''),
(27, 'Meuble d appoint', 0, 139, 1, 'Meuble d\'appoint, de chevet.<br />\r\nFabrication artisanale <br />\r\nBois massif<br />\r\nCouleur bois et noir.<br />\r\n1 tiroir'),
(28, 'Lampe vintage', 0, 89, 3, 'Lampe vintage de bureau ou salon<br />\r\nBras articulé '),
(30, 'Decoration murale', 1, 89, 2, 'Décoration murale<br />\r\n90cm de diamètre '),
(31, 'Vases', 0, 29, 2, 'Vases'),
(32, 'Décoration murale', 0, 69, 1, 'Décoration murale'),
(33, 'Table basse XXL ', 1, 1990, 1, 'Table basse en poutre de chêne <br />\r\n245-260x95cm'),
(34, 'Table d\'appoint', 0, 199, 1, 'Table en chêne massif<br />\r\nDiamètre 50cm<br />\r\nEpaisseur 10 cm<br />\r\nHauteur 50cm'),
(35, 'Banc', 1, 249, 1, 'Banc<br />\r\nChene massif<br />\r\nLongueur 121 cm<br />\r\nLargeur 33cm<br />\r\nHauteur 49 cm'),
(36, 'Bureau', 1, 890, 1, 'Bureau<br />\r\nChêne massif<br />\r\nRecyclé <br />\r\n160cm x 80cm<br />\r\nPiètement acier blanc'),
(37, 'Table basse', 1, 290, 1, 'Table basse<br />\r\nPoutre de grange recyclées <br />\r\n108 cm x 47 cm<br />\r\nHauteur 39 cm<br />\r\nEpaisseur 7 cm'),
(38, 'Table basse', 1, 650, 1, 'Table basse en chêne massif<br />\r\n132x68×24cm <br />\r\nLongueur×largeur×hauteur'),
(39, 'Lampe à poser', 0, 259, 2, 'Lampe à poser<br />\r\n<br />\r\nAncienne lanterne de carrosse <br />\r\nMontée sur une Vieille poutre de grange recyclé '),
(40, 'Suspension luminaire en bois', 0, 89, 2, 'Cette suspension créera une atmosphère unique grâce au toucher naturel du bois tourné et à une lumière crue, sans ombre.<br />\r\n<br />\r\nLe modèle est terminé par un soffite en fer vieilli qui renforce encore son aspect vintage.<br />\r\n'),
(41, 'Lampe à poser', 0, 129, 2, 'Lampe à poser<br />\r\n<br />\r\nDESIGN INTEMPOREL ET ÉCLECTIQUE, LIGNES PURES ET SIMPLES / DISPONIBLE DANS PLUS DE COULEURS / UTILISATION EXCLUSIVE POUR L\'INTÉRIEUR / GRAND ABAT-JOUR QUI GÉNÈRE UN ÉCLAIRAGE AGRÉABLE ET NON ÉBLOUISSANT<br />\r\n<br />\r\nNettoyage avec un chiffon doux en microfibre. Ne pas utiliser de produits agressifs, uniquement de l\'eau et du savon neutre si nécessaire, sécher ensuite.'),
(42, 'Suspension naturelle', 0, 69, 2, 'Suspension en fibres naturelles<br />\r\nHauteur 70 cm<br />\r\nDiametre 60 cm'),
(43, 'Chaise bistrot Luterma x4', 1, 200, 1, 'Chaise de bistrot Luterma<br />\r\nVintage<br />\r\nVendu en lot de 4'),
(44, 'Table basse', 1, 990, 1, 'Table basse sur roues industrielles<br />\r\nChêne '),
(45, 'Banc enfant', 0, 259, 1, 'Banc enfant en chêne massif<br />\r\nPoutres de grange recyclées <br />\r\n108x20cm<br />\r\nHauteur 30 cm'),
(46, 'Lampe industrielle de bureau', 0, 89, 3, 'Lampe industrielle de bureau '),
(47, 'Brasero sur pied', 0, 129, 2, 'Brasero sur pieds<br />\r\nBougies en terre cuite<br />\r\nHauteur 145cm'),
(50, 'Table basse vintage', 1, 290, 3, 'Table basse vintage'),
(51, 'Rocking chair enfant en rotin', 0, 79, 3, 'Rocking chair enfant<br />\r\nEn rotin<br />\r\nAnnee 60'),
(52, 'Banc de cinéma ', 0, 590, 3, 'Banc de cinema<br />\r\n5 sièges <br />\r\nAnnees 50'),
(53, 'Chaise pliante Coronet', 0, 190, 3, 'Chaise pliante <br />\r\nCORONET<br />\r\nAnnées 60'),
(54, 'Chaise scandinave ', 0, 190, 3, 'Chaise scandinave<br />\r\nAnnées 60'),
(55, 'Table style Louis XV', 0, 890, 1, ''),
(56, 'Bureau annees 50', 1, 199, 3, 'Bureau <br />\r\nAnnées 50<br />\r\n105cm x 65 cm<br />\r\nHauteur 71'),
(57, 'Chaises', 0, 50, 3, 'Chaises anciennes <br />\r\nMoulures dorées <br />\r\n2 disponibles à  la vente'),
(58, 'Mesure grains', 0, 69, 3, 'Mesure grains<br />\r\nTres anciens<br />\r\nPeut servir de poubelle à papiers'),
(59, 'Table de ferme', 1, 250, 3, 'Table de ferme'),
(60, 'Bureau en chêne ', 0, 320, 3, 'Bureau en chêne <br />\r\nAnnées 50<br />\r\n1m x 60cm<br />\r\nHauteur 76 cm'),
(61, 'Table de ferme', 1, 550, 3, 'Table de ferme<br />\r\n165x 70<br />\r\nHauteur 73cm');

-- --------------------------------------------------------

--
-- Structure de la table `products_pictures`
--

CREATE TABLE `products_pictures` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `picture_path` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `products_pictures`
--

INSERT INTO `products_pictures` (`id`, `product_id`, `picture_path`) VALUES
(1, 1, 'img37.jpeg'),
(2, 1, 'img47.jpeg'),
(3, 1, 'img52.jpeg'),
(4, 6, 'img40.jpeg'),
(5, 6, 'img51.jpeg'),
(6, 6, 'img78.jpeg'),
(7, 7, 'img85.jpeg'),
(8, 7, 'img64.jpeg'),
(9, 7, 'img55.jpeg'),
(10, 7, 'img48.jpeg'),
(11, 9, 'img27.jpeg'),
(12, 9, 'img28.jpeg'),
(13, 9, 'img29.jpeg'),
(14, 10, 'img31.jpeg'),
(15, 10, 'img58.jpeg'),
(16, 11, 'img30.jpeg'),
(17, 12, 'img32.jpeg'),
(18, 12, 'img33.jpeg'),
(19, 12, 'img59.jpeg'),
(20, 13, 'img81.jpeg'),
(21, 13, 'img80.jpeg'),
(22, 13, 'img82.jpeg'),
(23, 14, 'img53.jpeg'),
(24, 14, 'img54.jpeg'),
(25, 14, 'img125.jpeg'),
(26, 14, 'img126.jpeg'),
(27, 14, 'img127.jpeg'),
(28, 15, 'img43.jpeg'),
(29, 15, 'img42.jpeg'),
(30, 16, 'img87.jpeg'),
(31, 16, 'img88.jpeg'),
(32, 16, 'img63.jpeg'),
(33, 16, 'img62.jpeg'),
(34, 17, 'img4.jpeg'),
(35, 18, 'img15.jpeg'),
(36, 18, 'img16.jpeg'),
(37, 18, 'img17.jpeg'),
(38, 19, 'img14.jpeg'),
(39, 19, 'img25.jpeg'),
(40, 19, 'img26.jpeg'),
(41, 20, 'img18.jpeg'),
(42, 20, 'img19.jpeg'),
(43, 20, 'img20.jpeg'),
(44, 21, 'img23.jpeg'),
(45, 21, 'img24.jpeg'),
(46, 23, 'img1.jpeg'),
(47, 23, 'img2.jpeg'),
(48, 23, 'img3.jpeg'),
(49, 24, 'img5.jpeg'),
(50, 24, 'img6.jpeg'),
(51, 24, 'img7.jpeg'),
(52, 24, 'img8.jpeg'),
(53, 24, 'img9.jpeg'),
(54, 24, 'img10.jpeg'),
(55, 25, 'img11.jpeg'),
(56, 25, 'img12.jpeg'),
(57, 25, 'img13.jpeg'),
(58, 27, 'img120.jpeg'),
(59, 27, 'img124.jpeg'),
(60, 27, 'img123.jpeg'),
(61, 27, 'img122.jpeg'),
(62, 28, 'img57.jpeg'),
(63, 28, 'img128.jpeg'),
(64, 28, 'img129.jpeg'),
(65, 30, 'img61.jpeg'),
(66, 30, 'img60.jpeg'),
(67, 31, 'img66.jpeg'),
(68, 31, 'img65.jpeg'),
(69, 32, 'img72.jpeg'),
(70, 32, 'img70.jpeg'),
(71, 32, 'img69.jpeg'),
(72, 32, 'img67.jpeg'),
(73, 33, 'img73.jpeg'),
(74, 33, 'img74.jpeg'),
(75, 33, 'img75.jpeg'),
(76, 34, 'img77.jpeg'),
(77, 34, 'img76.jpeg'),
(78, 35, 'img83.jpeg'),
(79, 35, 'img84.jpeg'),
(80, 36, 'img89.jpeg'),
(81, 36, 'img90.jpeg'),
(82, 37, 'img91.jpeg'),
(83, 37, 'img93.jpeg'),
(84, 38, 'img94.jpeg'),
(85, 38, 'img95.jpeg'),
(86, 38, 'img96.jpeg'),
(87, 38, 'img97.jpeg'),
(88, 39, 'img99.jpeg'),
(89, 39, 'img98.jpeg'),
(90, 39, 'img100.jpeg'),
(91, 39, 'img101.jpeg'),
(92, 39, 'img102.jpeg'),
(93, 40, 'img103.jpeg'),
(94, 41, 'img104.jpeg'),
(95, 41, 'img105.jpeg'),
(96, 42, 'img107.jpeg'),
(97, 42, 'img106.jpeg'),
(98, 43, 'img118.jpeg'),
(99, 43, 'img117.jpeg'),
(100, 43, 'img116.jpeg'),
(101, 43, 'img119.jpeg'),
(102, 43, 'img113.jpeg'),
(103, 43, 'img111.jpeg'),
(104, 43, 'img112.jpeg'),
(105, 43, 'img110.jpeg'),
(106, 43, 'img109.jpeg'),
(107, 43, 'img108.jpeg'),
(108, 43, 'img114.jpeg'),
(109, 43, 'img115.jpeg'),
(110, 44, 'img130.jpeg'),
(111, 44, 'img131.jpeg'),
(112, 44, 'img132.jpeg'),
(113, 45, 'img134.jpeg'),
(114, 45, 'img135.jpeg'),
(115, 46, 'img136.jpeg'),
(116, 46, 'img137.jpeg'),
(117, 46, 'img138.jpeg'),
(118, 47, 'img141.jpeg'),
(119, 47, 'img142.jpeg'),
(120, 50, 'img143.jpeg'),
(121, 50, 'img144.jpeg'),
(122, 50, 'img145.jpeg'),
(123, 50, 'img146.jpeg'),
(124, 51, 'img148.jpeg'),
(125, 51, 'img147.jpeg'),
(126, 51, 'img149.jpeg'),
(127, 52, 'img150.jpeg'),
(128, 52, 'img152.jpeg'),
(129, 52, 'img151.jpeg'),
(130, 53, 'img153.jpeg'),
(131, 53, 'img154.jpeg'),
(132, 53, 'img155.jpeg'),
(133, 54, 'img156.jpeg'),
(134, 54, 'img157.jpeg'),
(135, 54, 'img158.jpeg'),
(136, 54, 'img159.jpeg'),
(137, 55, 'img160.jpeg'),
(138, 55, 'img161.jpeg'),
(139, 55, 'img162.jpeg'),
(140, 55, 'img163.jpeg'),
(141, 56, 'img168.jpeg'),
(142, 56, 'img167.jpeg'),
(143, 57, 'img178.jpeg'),
(144, 57, 'img177.jpeg'),
(145, 57, 'img176.jpeg'),
(146, 57, 'img175.jpeg'),
(147, 58, 'img170.jpeg'),
(148, 58, 'img171.jpeg'),
(149, 58, 'img172.jpeg'),
(150, 58, 'img173.jpeg'),
(151, 58, 'img174.jpeg'),
(152, 59, 'img166.jpeg'),
(153, 59, 'img165.jpeg'),
(154, 59, 'img164.jpeg'),
(155, 60, 'img183.jpeg'),
(156, 60, 'img182.jpeg'),
(157, 60, 'img181.jpeg'),
(158, 60, 'img184.jpeg'),
(159, 60, 'img185.jpeg'),
(160, 61, 'img186.jpeg'),
(161, 61, 'img187.jpeg'),
(162, 61, 'img188.jpeg');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `products_pictures`
--
ALTER TABLE `products_pictures`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT pour la table `products_pictures`
--
ALTER TABLE `products_pictures`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=163;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `products_pictures`
--
ALTER TABLE `products_pictures`
  ADD CONSTRAINT `products_pictures_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
