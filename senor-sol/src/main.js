import './style.css'

const testRoute = async (url) => {
  const response = await fetch(url)
  const data = await response.json()
  console.log('data:', data);
}

const url1 = 'http://api.zippopotam.us/us/90210';
const url2 = 'https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400';

testRoute(url1);
testRoute(url2);