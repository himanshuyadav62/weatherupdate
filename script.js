document.addEventListener("DOMContentLoaded", function (e) {
  e.preventDefault();
  doApiCall();
});
function doApiCall() {
  let city = "Delhi";
  let inputCity = document.getElementById("city").value;
  if (inputCity != "") {
    city = inputCity;
    document.getElementById("cityName").innerHTML = city;
  }
  const url =
    "https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=" +
    encodeURIComponent(city);
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "3ce9ba8a8emsheeeab9418ac3ee8p1d7578jsnf367fe60a48b",
      "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
    },
  };

  fetch(url, options)
    .then((response) => response.json())
    .then((response) => {
      console.log(city);
      console.log(response);
      const Temp = document.getElementById("temp");
      Temp.innerHTML = response.temp + " ⁰C";
      const FeelsLike = document.getElementById("feels_like");
      FeelsLike.innerHTML = response.feels_like + " ⁰C";
      const MinTemp = document.getElementById("min_temp");
      MinTemp.innerHTML = response.min_temp;
      const MaxTemp = document.getElementById("max_temp");
      MaxTemp.innerHTML = response.max_temp;
      const WindSpeed = document.getElementById("wind_speed");
      WindSpeed.innerHTML = response.wind_speed;
      const WindDirection = document.getElementById("wind_degrees");
      WindDirection.innerHTML = response.wind_degrees;
      const Sunrise = document.getElementById("sunrise");
      Sunrise.innerHTML = convertTimestampToHHMM(response.sunrise);
      const Sunset = document.getElementById("sunset");
      Sunset.innerHTML = convertTimestampToHHMM(response.sunset);
      const Humidity = document.getElementById("humidity");
      Humidity.innerHTML = response.humidity;
      const DirecionSign = document.getElementById("arrow");
      setWindDirection(DirecionSign, response.wind_degrees);
    })
    .catch((err) => {
      console.log(err);
      console.log("this place is not availabe");
    });
}
document.getElementById("search").addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent form submission to avoid page refresh
  doApiCall();
  document.getElementById("city").value = "";
});

function convertTimestampToHHMM(timestamp) {
  const date = new Date(timestamp * 1000); // Convert UNIX timestamp to milliseconds
  const hours = date.getHours().toString().padStart(2, "0"); // Get hours and pad with leading zero if needed
  const minutes = date.getMinutes().toString().padStart(2, "0"); // Get minutes and pad with leading zero if needed
  return `${hours}:${minutes}`;
}
function setWindDirection(element, degrees) {
  element.style.transform = `rotate(${degrees}deg)`;
}
// try {
//   const response = await fetch(url, options);
//   const result = await response.text();
// } catch (error) {
//   console.error(error);
// }

/*
async function getWeatherData() {
    const url = 'https://weatherapi-com.p.rapidapi.com/current.json?q=' + city;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '3ce9ba8a8emsheeeab9418ac3ee8p1d7578jsnf367fe60a48b',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}
*/
// Call the asynchronous function to start the API request
// getWeatherData();
