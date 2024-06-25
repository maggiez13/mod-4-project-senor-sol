import './style.css'

// const testRoute = async (url) => {
//   const response = await fetch(url)
//   const data = await response.json()
//   console.log('data:', data);
// }

// const testRoute2 = async (url) => {
//   const response = await fetch(url)
//   const data = await response.json()
//   console.log('data:', data.results.sunrise, data.results.sunset);
// }

// const url1 = 'http://api.zippopotam.us/us/90210';
//   const url2 = 'https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400';
// testRoute(url1);
// testRoute2(url2);

const getLocationData = async (zipCode) => {
  const zipcodeUrl = `https://api.zippopotam.us/us/${zipCode}`;
  const response = await fetch(zipcodeUrl);
  if (!response.ok) {
      throw new Error(`Error fetching data from Zippopotam API: ${response.status}`);
  }
  const data = await response.json();
  const place = data.places[0];
  const latitude = place.latitude;
  const longitude = place.longitude;
  const city = place['place name'];
  const state = place['state abbreviation'];
  return { latitude, longitude, city, state };
}

const getSunriseSunset = async (latitude, longitude) => {
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

const main = async () => {
  const zipCode = prompt("Enter a US ZIP code:");
  // change when create form, placeholder for now 
  try {
      const { latitude, longitude, city, state } = await getLocationData(zipCode);
      const { sunrise, sunset } = await getSunriseSunset(latitude, longitude);
      console.log(`Location: ${city}, ${state}`);
      console.log(`Sunrise: ${new Date(sunrise).toLocaleTimeString()}`);
      console.log(`Sunset: ${new Date(sunset).toLocaleTimeString()}`);
  } catch (error) {
      console.error(error);
  }
}

main();
