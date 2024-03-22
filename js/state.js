var scriptTag = document.createElement('script');
scriptTag.async = true;
scriptTag.src = 'https://www.googletagmanager.com/gtag/js?id=G-J6WB8D1GL7';
document.head.appendChild(scriptTag);

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