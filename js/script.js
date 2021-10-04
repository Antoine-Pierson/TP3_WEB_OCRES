
// Fonction appelée lors du click du bouton
function start(city) {
  // Création de l'objet apiWeather
  const apiWeather = new API_WEATHER(city);
  // Appel de la fonction fetchTodayForecast
  
  if(city != "" && city != null) {
    apiWeather.setCity(city);
  }

  apiWeather
    .fetchTodayForecast()
    .then(function(response) {
      // Récupère la donnée d'une API
      const data = response.data;

      // On récupère l'information principal
      const main = data.weather[0].main;
      const description = data.weather[0].description;
      const temp = data.main.temp;
      const icon = apiWeather.getHTMLElementFromIcon(data.weather[0].icon);

      // Modifier le DOM
      document.getElementById('today-forecast-main').innerHTML = main;
      document.getElementById('today-forecast-more-info').innerHTML = description;
      document.getElementById('icon-weather-container').innerHTML = icon;
      document.getElementById('today-forecast-temp').innerHTML = `${temp}°C`;
      
    })
    .catch(function(error) {
      // Affiche une erreur
      console.error(error);
    });

  apiWeather
    .fetchThreeDayForecast()
    .then(function(response) {
      // Récupère la donnée d'une API
      const data = response.data;

      let arr = data.list;

      for(let i = 0; i < arr.length; i++){
        document.getElementById('today' + i + '-forecast-main' ).innerHTML = arr[i].weather[0].main;
        document.getElementById('today' + i + '-forecast-more-info').innerHTML = arr[i].weather[0].description;
        document.getElementById('icon' + i + '-weather-container').innerHTML = apiWeather.getHTMLElementFromIcon(arr[i].weather[0].icon);
        document.getElementById('today' + i + '-forecast-temp').innerHTML = `${arr[i].temp.day}°C`;
      }
      
    })
    .catch(function(error) {
      // Affiche une erreur
      console.error(error);
    });
}

function changeCity() {
  var city = document.getElementById("city-input").value;
  start(city);
}
