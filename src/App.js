import "./App.css";
import { useState, useEffect } from "react";

// 1. 앱이 실행되자마자 해당 위치의 날씨가 보인다
// 2. 날씨정보에는 도시, 섭씨 화씨 정보가 있음
// 3. 5개의 버튼이 있다. (현재위치, 다른위치 +4)
// 4. 도시버튼을 클릭할 때 마다 도시별 날씨가 나온다
// 5. 현재위치 버튼을 누르면 현재 위치 날씨를 불러온다.
// 6. 로딩 스피너

function App() {
  const [weather, setWeather] = useState();

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        console.log(lat, lon);
        getWeatherByCurrentLocation(lat, lon);
      },
      (error) => {
        console.error(error);
        let fixLat = 37.57172739654245;
        let fixLon = 126.99401182637855;
        getWeatherByCurrentLocation(fixLat, fixLon);
      }
    );
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${"289933327225705a87c1c131ea5628f1"}`;
      let response = await fetch(url);
      let data = await response.json();
      console.log(data);

      setWeather(data);
    } catch (error) {
      console.error(error);
    }
  };

  function kelvinToCelsius(kelvin) {
    let celsius = kelvin - 273.15;
    return celsius.toFixed(2);
  }

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div>
      <h2>{weather?.name}</h2>
      <h3>{kelvinToCelsius(weather?.main.temp)}</h3>
      <p>{weather?.weather[0].main}</p>
      <section>
        <button>현재위치</button>
        <button>지정위치</button>
        <button>지정위치</button>
        <button>지정위치</button>
        <button>지정위치</button>
      </section>
    </div>
  );
}

export default App;
