import os
import re
import xml.etree.ElementTree as ET
from xml.dom import minidom

# --------------------------------------------------------
# Renommage des images
# --------------------------------------------------------

def rename_images_in_folders(base_path):
    if not os.path.isdir(base_path):
        print(f"Le chemin spécifié n'est pas un dossier valide : {base_path}")
        return

    for folder in sorted(os.listdir(base_path)):
        folder_path = os.path.join(base_path, folder)

        if not os.path.isdir(folder_path):
            continue

        files = [
            f for f in os.listdir(folder_path)
            if f.lower().endswith((".jpg", ".jpeg", ".png"))
        ]

        # Recherche des fichiers déjà correctement nommés
        regex = re.compile(rf"^{re.escape(folder)}(\d+)\.(jpg|jpeg|png)$", re.IGNORECASE)

        max_index = 0
        new_files = []

        for f in files:
            m = regex.match(f)
            if m:
                max_index = max(max_index, int(m.group(1)))
            else:
                new_files.append(f)

        print(f"{folder} : {len(files)} image(s), dernier index = {max_index}")

        # On renomme uniquement les nouvelles images
        new_files.sort()

        for image in new_files:
            _, ext = os.path.splitext(image)
            max_index += 1

            new_name = f"{folder}{max_index}{ext.lower()}"

            old_path = os.path.join(folder_path, image)
            new_path = os.path.join(folder_path, new_name)

            print(f"Renommage : {image} -> {new_name}")
            os.rename(old_path, new_path)

# --------------------------------------------------------
# Génération automatique du XML
# --------------------------------------------------------

def prettify(element):
    rough = ET.tostring(element, encoding="utf-8")
    parsed = minidom.parseString(rough)
    return parsed.toprettyxml(indent="    ", encoding="UTF-8")

def generate_gallery_xml(photos_path, output_file):
    root = ET.Element("galleries")

    for folder in sorted(os.listdir(photos_path)):
        folder_path = os.path.join(photos_path, folder)

        if not os.path.isdir(folder_path):
            continue

        gallery = ET.SubElement(
            root,
            "gallery",
            {
                "id": folder,
                "title": folder.replace("_", " ").title()
            }
        )

        images = sorted(
            [
                f for f in os.listdir(folder_path)
                if f.lower().endswith((".jpg", ".jpeg", ".png"))
            ],
            key=lambda x: int(re.search(r"\d+", x).group())
            if re.search(r"\d+", x)
            else float("inf")
        )

        for image in images:
            ET.SubElement(
                gallery,
                "image",
                {
                    "src": f"photos/{folder}/{image}",
                    "alt": os.path.splitext(image)[0]
                }
            )

    with open(output_file, "wb") as f:
        f.write(prettify(root))

    print(f"XML généré : {output_file}")

# --------------------------------------------------------
# Programme principal
# --------------------------------------------------------

if __name__ == "__main__":

    cwd = os.getcwd()
    photos_path = os.path.join(cwd, "photos")
    xml_path = os.path.join(cwd, "gallery-config.xml")

    rename_images_in_folders(photos_path)
    generate_gallery_xml(photos_path, xml_path)