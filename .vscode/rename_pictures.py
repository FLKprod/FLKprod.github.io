import os
import re

# CODE POUR RENOMMER LES IMAGES APRES AJOUT SUR LE SITE #

def rename_images_in_folders(base_path):
    if not os.path.isdir(base_path):
        print(f"Le chemin spécifié n'est pas un dossier valide: {base_path}")
        return
    
    for folder in os.listdir(base_path):
        folder_path = os.path.join(base_path, folder)
        if os.path.isdir(folder_path):
            images = [f for f in os.listdir(folder_path) if f.lower().endswith(('jpg', 'jpeg', 'png'))]

            print(f"Dossier: {folder} - Nombre de photos: {len(images)}")

            images.sort(key=lambda x: int(re.search(r'\d+', x).group()) if re.search(r'\d+', x) else float('inf'))
            
            for index, image in enumerate(images, start=1):
                ext = os.path.splitext(image)[1]
                correct_name = f"{folder}{index}{ext}"
                current_path = os.path.join(folder_path, image)
                new_path = os.path.join(folder_path, correct_name)
                if image != correct_name:
                    print(f"Renommage: {image} -> {correct_name}")
                    os.rename(current_path, new_path)
if __name__ == "__main__":
    chemin_par_defaut = "C:\\Users\\maxfl\\OneDrive\\Documents\\GitHub\\FLKprod.github.io\\Photos\\Carrousel"
    rename_images_in_folders(chemin_par_defaut)
