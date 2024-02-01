import { useEffect, useState } from 'react'
import './App.css'
import Loader from './components/Loader'
import Weather from './components/Weather'
import axios from 'axios'

const apiKey = "ed6eec165b7d136a1d0b370096ff95ef"

const imgClima = {
   "clear sky": "cieloDespejado",
   "light rain": "lluviafondo",
   "few clouds": "pocasNubes",
   "scattered clouds": "nubesDispersas",
   "broken clouds": "rayos",
   "shower rain": "aguacero",
   "thunderstorm": "tormenta",
   "snow": "snow",
   "mist": "nubesRotas"
}

function App() {

  const [clima, setClima] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  const success = (pos) => {
    const lat = pos.coords.latitude;
    const long = pos.coords.longitude;

    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`)
      .then((res) => setClima(res.data))
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success)
  }, [])

  return (
    <main className={`relative font-["Poppins"] w-[100%] h-[100vh] flex justify-center items-center ${imgClima[clima?.weather[0].description]} mainContainer ${darkMode? "": "dark"}`}>
      {clima === null ? <Loader/> : <Weather clima={clima} apiKey={apiKey} setClima={setClima} darkMode={darkMode} setDarkMode={setDarkMode}/>}
      <section className={`absolute w-[100%] h-[100vh] ${darkMode? "bg-black/0": "bg-black/50" } z-0`}></section>
      {/* <Weather clima={clima} apiKey={apiKey} setClima={setClima} darkMode={darkMode} setDarkMode={setDarkMode}/> */}
    </main>
  )
}

export default App
