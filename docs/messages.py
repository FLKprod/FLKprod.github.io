import time
import pyautogui

# Attendre un peu avant de commencer, pour vous donner le temps de placer le curseur dans le champ de texte approprié
time.sleep(5)

# Réduire le délai par défaut entre les commandes
pyautogui.PAUSE = 0  # Désactive le délai ajouté après chaque opération de pyautogui

# Boucle de 0 à 100
for i in range(101):
    pyautogui.write("hehehehe", interval=0.000000000000000001)  # Réduit le temps entre les frappes à 0.01 secondes
    pyautogui.press('enter')