import './App.css';
import sun from "./assets/sun-svgrepo-com.svg"
import {useState,useEffect} from 'react'

function App() {
  // API
  const city = "Chiang Mai"; // เก็บค่าเอาไว้เพื่อบอกว่าเราจะดู weather ของ bangkok
  const apiKey = "f32dbd6264e2896734876a08ea300a1b"
  const [cityWeather,setCityWeather] = useState({name:"Bangkok",sys:{country:"th"}}) //สร้าง state เพื่อเก็บผลจากการที่เราขอข้อมูลไปที่ API

  // useEffect
  useEffect(() =>{
    const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    fetch(url)
      .then(res => res.json()) // รับ data json มา
      .then(data => {
        // console.log(data)
        // console.log(data.sys.country)
        setCityWeather(data);
        setIsLoading(true)
        
      })
  },[])
  
  // useEffect(() =>fetchData ,[])

  //Data ยังโหลดไม่ครบแต่ ract render ก่อนแล้วเลยต้องแก้ปัญหา
  const [isLoading,setIsLoading] = useState(false);


  //fuction covert
  const constvertTemp =(k)=> {
    return Math.round(k-272.15)
  }
 
  // async function fetchData  () {
  //   const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
  //   const response = await fetch(url)
  //   return await response.json();
  // }
  
  return (
    ( isLoading &&
        <div className="App">
          <section>
            
            <div className="location">
              {/* <div className="img-sun"> <img src={sun} alt="sun"/> </div> */}
              <h1 className="city">{cityWeather.name}</h1>
              <p className="state">{cityWeather.sys.country}</p>
            </div>

            <div className="card">
              <div className="weather">
                <h1>{constvertTemp(cityWeather.main.temp)} °C</h1>
                <small>max: {constvertTemp(cityWeather.main.temp_max)} °C , min: {constvertTemp(cityWeather.main.temp_min)} °C</small>
              </div>

              <div className="info">
                <div className="status">{cityWeather.weather[0].main}</div>
                <div className="humidity">humidity : {cityWeather.main.humidity} </div>
                <div className="wind">wind speed : {cityWeather.wind.speed} </div>
              </div>
            </div>
          
          </section>
        </div>
    )
  );
}

export default App;
