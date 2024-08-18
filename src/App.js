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
  const cities = ["paris", "new york", "tokyo", "seoul"];
  const [selectBt, setSelectBt] = useState("현재위치");
  const [loading, setLoading] = useState(true);

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
        // alert("현재 위치를 불러올 수 없어 서울로 설정합니다.");
        let fixLat = 37.57172739654245;
        let fixLon = 126.99401182637855;
        getWeatherByCurrentLocation(fixLat, fixLon);
      }
    );
  };
  const getWeatherByCurrentLocation = async (lat, lon) => {
    setSelectBt("현재위치");

    try {
      setLoading(true);
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=kr&appid=${process.env.REACT_APP_API_KEY}`;
      let response = await fetch(url);
      let data = await response.json();

      setWeather(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  function kelvinToCelsius(kelvin) {
    let celsius = kelvin - 273.15;
    return celsius.toFixed(2);
  }

  const searchByCity = async (cityName) => {
    setSelectBt(cityName);
    try {
      setLoading(true);
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.REACT_APP_API_KEY}`;
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div>
      {loading ? (
        <>로딩중..</>
      ) : (
        <>
          <h2 style={{ borderBottom: "1px solid black", padding: "10px" }}>
            {weather?.name}
          </h2>
          <h3 style={{ borderBottom: "1px solid black", padding: "10px" }}>
            {kelvinToCelsius(weather?.main.temp)}
          </h3>
          <p style={{ borderBottom: "1px solid black", padding: "10px" }}>
            {weather?.weather[0].main}
          </p>
          <section>
            <button
              onClick={() => getCurrentLocation()}
              style={{
                backgroundColor: selectBt === "현재위치" ? "f5f5f7" : "#fff",
                padding: "10px",
              }}
            >
              현재위치
            </button>
            {cities.map((item, index) => (
              <button
                key={index}
                onClick={() => searchByCity(item)}
                style={{
                  backgroundColor: selectBt === item ? "f5f5f7" : "#fff",
                  padding: "10px",
                }}
              >
                {item}
              </button>
            ))}
          </section>
        </>
      )}
    </div>
  );
}

export default App;
