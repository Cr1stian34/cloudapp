
export const WeatherStat = ({icon, unit, value}) => {

  return (
    <div className="flex items-center gap-2 ">
          <img src={icon} alt="" />
          <span>{value}{unit}</span>
    </div>
  )
}
