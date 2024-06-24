import './style.css'

// const testRoute = async (url) => {
//   const response = await fetch(url)
//   const data = await response.json()
//   console.log('data:', data);
// }

// const url1 = 'http://api.zippopotam.us/us/90210';
//   const url2 = 'https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400';
// testRoute(url1);
// testRoute(url2);

async function getLocationData(zipCode) {
  const zipcodeUrl = `https://api.zippopotam.us/us/${zipCode}`;
  const response = await fetch(zipcodeUrl);
  if (!response.ok) {
      throw new Error(`Error fetching data from Zippopotam API: ${response.status}`);
  }
  const data = await response.json();
  const latitude = data.places[0].latitude;
  const longitude = data.places[0].longitude;
  return { latitude, longitude };
}

async function getSunriseSunset(latitude, longitude) {
  const sunriseSunsetUrl = `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&formatted=0`;
  const response = await fetch(sunriseSunsetUrl);
  if (!response.ok) {
      throw new Error(`Error fetching data from Sunrise-Sunset API: ${response.status}`);
  }
  const data = await response.json();
  const sunrise = data.results.sunrise;
  const sunset = data.results.sunset;
  return { sunrise, sunset };
}

async function main() {
  const zipCode = prompt("Enter a US ZIP code:");
  try {
      const { latitude, longitude } = await getLocationData(zipCode);
      const { sunrise, sunset } = await getSunriseSunset(latitude, longitude);
      console.log(`Sunrise: ${new Date(sunrise).toLocaleTimeString()}`);
      console.log(`Sunset: ${new Date(sunset).toLocaleTimeString()}`);
  } catch (error) {
      console.error(error);
  }
}

main();