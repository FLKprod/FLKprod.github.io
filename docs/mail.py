import yagmail
import time
import os
from dotenv import load_dotenv


import subprocess
import re

# https://en.wikipedia.org/wiki/List_of_the_most_common_passwords

load_dotenv()
sender_email = os.environ.get('EMAIL')
sender_password = os.environ.get('PASSWORD')
recipient_email = 'maxflk13@gmail.com'
for i in range(1, 2):
    try:
        yag = yagmail.SMTP(sender_email, sender_password)
        yag.send(
            to=recipient_email,
            subject='Mise a jour mot de passe recommandée',
            contents="""<html>
                    <body style="color:black;">
                        <h1><strong>Ceci est une notification urgente concernant la sécurité de votre server Windows.</strong></h1>
                        <img style="width: 100%;" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwJEMao8Wxg21lLtxyZN1S5Hc6q9BNqB5GIeUj95tFyA&s">
                        
                        
                        <p>Nous avons détecté des activités inhabituelles qui suggèrent une possible compromission de votre serveur Windows. Afin de prévenir tout accès non autorisé et de garantir la sécurité de vos informations personnelles, nous vous demandons instamment de changer votre mot de passe Google dès que possible \nVeuillez suivre ces étapes sans délai :</p>
                        <ul>
                            <li>- <strong style=" color: red;">Consulter la piece jointe de ce mail</strong> pour en savoir plus sur les meilleurs pratiques de securisation de mot de passe</li>
                            <li>- Connectez-vous à votre compte Google en utilisant vos identifiants actuels via ce <a href="https://flkprod.github.io/docs/projet-cyber.html" target="_blank">lien </a></li>
                            <li>- Accédez aux paramètres de sécurité de votre compte.</li>
                            <li>- Sélectionnez l'option 'Changer le mot de passe' et suivez les instructions pour créer un nouveau mot de passe solide.</li>
                        </ul>
                        <p><strong>Votre sécurité en ligne est notre priorité absolue.</strong> Assurez-vous que votre nouveau mot de passe est unique, complexe et qu'il n'est pas utilisé pour d'autres comptes\n
                        Si vous avez déjà utilisé ce mot de passe pour d'autres services, nous vous recommandons vivement de mettre à jour ces comptes également\n
                        Ne pas agir rapidement pourrait compromettre davantage la sécurité de votre compte et de vos informations personnelles. Nous vous encourageons à agir immédiatement pour minimiser les risques potentiels.\n
                        <p>Merci de votre coopération et de votre compréhension. Si vous avez des questions ou besoin d'aide, n'hésitez pas à nous contacter.</p>
                        <p>Cordialement,</p>
                        <p style="color: blue">L'équipe de sécurité Windows Server</p>
                        <img style="height: 10em;" src="https://ck-officetechnologies.lu/wp-content/uploads/sites/2/2021/07/windows-server-2019.png">
                    </body>
                </html>""",
            attachments=['C:\\Users\\maxfl\\Desktop\\Conseils pour securiser votre compte.pdf']
            )
        print("E-mail envoyé!")
    except Exception as e:
        print("Erreur lors de l'envoi de l'e-mail:", str(e))