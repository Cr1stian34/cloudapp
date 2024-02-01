import { useState } from "react";
import { WeatherStat } from "./WeatherStat";
import axios from "axios";

const Weather = ({ clima, apiKey, setClima, darkMode ,setDarkMode }) => {

  const [isCelcius, setIsCelcius] = useState(false)

  const handleChangeGrados = (temp) => {

    if (isCelcius) {
      const c = (temp - 273.15).toFixed(0)

      return `${c}ºC`
    } else {
      const F = (((temp - 273.15) * 9 / 5) + 32).toFixed(0);
      return `${F}ºF`
    }
  }

  const handleChangeBoolean = () => {
    setIsCelcius(!isCelcius)
  }

  const handleSubmit =(e)=>{
    e.preventDefault()
    const city = e.target.city_name.value;

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    .then((res)=>setClima(res.data))
    .catch((err)=>console.log(err))

  }

  const handleDarkMode =()=>{
    setDarkMode(!darkMode)
  }

  return (
    <section className="text-center z-10">
      <header className="w-[300px]">
        <div className="flex justify-between mb-5">
          <h1>Weather app</h1>
          <i onClick={handleDarkMode} className={`bx ${darkMode ? "bxs-moon": "bxs-sun"}`}></i>
        </div>
        <form onSubmit={handleSubmit} className=" relative">
          <input name="city_name" className="w-[100%] p-1 mb-5 rounded-md text-black inputForm" placeholder="busca una ciudad" type="text" />
          <button type="submit" className="absolute top-1 right-2" ><i className='bx bx-search-alt-2 searchIcon'></i></button> 
        </form>
      </header>
      <div className=" mb-5">
        <h2>{clima?.name}, {clima?.sys.country}</h2>
      </div>
      <article className="p-5 max-w-[300px] rounded-3xl bg-slate-600/50">
        <div>
          <h3>{clima?.weather[0].description}</h3>
        </div>
        <div className="flex justify-center items-center gap-5">
          <span className="text-[2rem]">{handleChangeGrados(clima?.main.temp)}</span>
          <div className="w-[150px]">
            <img src={`https://openweathermap.org/img/wn/${clima?.weather[0].icon}@2x.png`} alt="" />
          </div>
        </div>
      </article>
      <article className="flex gap-5 p-5 max-w-[300px] rounded-3xl bg-slate-600/50 mt-5">
        <WeatherStat icon="/viento.png" unit="m/s" value={clima?.wind.speed} />
        <WeatherStat icon="/lluvia.png" unit="%" value={clima?.main.humidity} />
        <WeatherStat icon="/caida.png" unit="hPa" value={clima?.main.pressure} />
      </article>
      <button onClick={handleChangeBoolean} className="mt-4 px-5 py-1 rounded-3xl btnChange">Cambiar a {isCelcius ? "ºF" : "ºC"}</button>
    </section>
  )
}

export default Weather