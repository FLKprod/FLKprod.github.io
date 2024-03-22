var domaine = location.hostname;
console.log(location.hostname)
if (domaine == 'flkprod.github.io'){
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-J6WB8D1GL7');
}
else{
    console.log("edition")
}