const weatherIcons= {
    "Rain" : "wi wi-day-rain",
    "Clouds" : "wi wi-day-cloudy",
    "Clear" : "wi wi-day-sunny",
    "Snow" : "wi wi-day-snow",
    "mist" : "wi wi-day-fog",
    "Drizzle" : "wi wi-day-sleet",
}

function capitalize(str){
    return str[0].toUpperCase() + str.slice(1);

}

async function main( withIP = true){
    let ville;

    if(withIP){
        
        //1. Choper l'adresse ip du pc qui ouvre la page: https//api.ipify.org?format=json
            // renvoie une promesse, en gros javascript nous dit qu'il va faire une action et qu'il nous promet qu'une fois terminé il nous enverra la réponse 
            
            //then = voila ce que tu va faire une fois la promesse réalisé (qu'il ai reçu le contenu de l'url qu'on lui a passé)

            

            //donc en résumé asynchrone = faire des taches en parallele 
            // fetch('https://api.ipify.org?format=json')
            // .then(resultat => console.log(resultat)) envoire une Response  ou il n'y a pas de données exploitable 
            //on y voit du json  donc on appelle la fonction json qui renvoie une promesse 
            //renvoie le vrai json , avec l'ip donc maintenant on pourra récupéré l'ip juste en dessous 
            // const ip = await fetch('https://get.geojs.io/v1/ip.json')
            // .then(resultat => resultat.json())
            // .then(json => json.ip)
            // console.log(ip);
                
            //le fetch est asynchrone , s'est a dire qu'il lance on action et ensuite passe a la suivante en attandant que l'action se termine , donc si on fait un console log de resultat en dehors il sera marqué en undefined
            //ce qui veut dire que le console en dessous se fera avant celui d'au-dessu  puisque celui d'au dessus se fera après après reçu la response 
            //   console.log(ip);   


        //2. 
            //Maintenant que l'on a l'ip, on peut Chopper la ville grâce à l'ip : http://freegeoip.net/json/adressIpDuMec (ne fonctionne plus donc on change par l'adresse trouvé ici : https://github.com/jakubdostal/leaflet-geoip/issues/7)

            //récupération dela ville
             ville = await fetch('https://get.geojs.io/v1/ip/geo.json')
                .then(resultat => resultat.json()) 
                //tu reçois un resultat et tu transforme le resultat en json
                //quand tu as terminé de transformer le resultat en json , tu prends le json et 
                .then(json => json.city)
                console.log(ville)
    }
    else{
        ville = document.querySelector('#ville').textContent;
        console.log(ville)
    }
        

   
    
// 3. Récupération de la météo d'une ville par rapport a la longitude et lattitude 
    // console.log('') 
    // console.log('récupération de la lattitude ');
    // const lat = await fetch('https://get.geojs.io/v1/ip/geo.json')
    // .then(resultat => resultat.json()) 
    // .then(json => json.latitude)
    // console.log(lat);


    // console.log('') 
    // console.log('récupération de la longitude ');
    // const lon = await fetch('https://get.geojs.io/v1/ip/geo.json')
    // .then(resultat => resultat.json()) 
    // .then(json => json.longitude)
    // console.log(lon);

   
    // console.log('') 
    // console.log('récupération de la météo par rapport a la longitude et lattitude  ');
    // const meteo = await fetch('http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid=d1cbecca5c549db8338636e12bf90f5e&lang=fr&units=metric')
    // .then(resultat => resultat.json()) 
    // .then(json => json)
    // console.log(meteo)

// 4. Récupération par exemple de la ville de Londres par le nom
    console.log(ville)     
    console.log('Récupération de la meteto de la ville par le nom'); 
    const meteo = await fetch('http://api.openweathermap.org/data/2.5/weather?q='+ville+'&APPID=d1cbecca5c549db8338636e12bf90f5e&lang=fr&units=metric')
    .then(resultat => resultat.json()) 
    // .then(json =>  console.log(json))
    .then(json =>  json) 
    console.log(meteo)

   displayWeatherInfos(meteo)

}
    

            
function displayWeatherInfos(data){
    const name = data.name;
    const temperature = data.main.temp;
    const conditions = data.weather[0].main;
    const description = data.weather[0].description;



    document.querySelector('#ville').textContent = name;
    document.querySelector('#temperature').textContent = Math.round(temperature);
    document.querySelector('#conditions').textContent = capitalize(description);
    document.querySelector('i.wi').className = weatherIcons[conditions];

    document.body.className = conditions.toLowerCase();
}


const ville = document.querySelector('#ville');
ville.addEventListener('click', () => {
    ville.contentEditable = true;
});

ville.addEventListener('keydown', (e) => {
   if(e.keyCode === 13){
       e.preventDefault();
       ville.contentEditable = false;
       main(false)
   }
});



main();
// console.log('coucou').