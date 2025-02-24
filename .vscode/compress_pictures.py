from PIL import Image
import os

def compress_images_recursively(base_path, quality=85):
    # Vérification du chemin
    if not os.path.isdir(base_path):
        print(f"Le chemin spécifié n'est pas un dossier valide: {base_path}")
        return
    
    # Parcours récursif de tous les dossiers et sous-dossiers
    for root, dirs, files in os.walk(base_path):
        for filename in files:
            # Vérification du type de fichier
            if filename.lower().endswith(('jpg', 'jpeg', 'png')):
                file_path = os.path.join(root, filename)
                image = Image.open(file_path)
                
                # Pour PNG : Conversion en palette optimisée
                if filename.lower().endswith('png'):
                    image = image.convert('P', palette=Image.ADAPTIVE)
                    optimized_path = os.path.join(root, filename)
                    image.save(optimized_path, optimize=True)
                    print(f"Compression PNG : {file_path}")
                
                # Pour JPEG : Utilisation d'une compression progressive et optimisée
                elif filename.lower().endswith(('jpg', 'jpeg')):
                    optimized_path = os.path.join(root, filename)
                    image = image.convert('RGB')  # Évite des erreurs avec certains JPEG
                    image.save(optimized_path, "JPEG", optimize=True, quality=quality, progressive=True)
                    print(f"Compression JPEG : {file_path}")

if __name__ == "__main__":
    chemin_par_defaut = "C:\\Users\\maxfl\\Documents\\GitHub\\FLKprod.github.io\\Photos\\Carrousel"
    compress_images_recursively(chemin_par_defaut)
