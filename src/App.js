import React from 'react';
import './App.css';
import 'weather-icons/css/weather-icons.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Weather from './app_component/weather.component';
import Form from './app_component/form.component';

//api call api.openweathermap.org/data/2.5/weather?q=London,uk&appid={API key}
const API_key="e30637f84b92a95ba1a43c0fd38953c0"


class App extends React.Component {
  constructor(){
    super();
    this.state={
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description:"",
      error: false
    };

    this.weatherIcon={
      Thunderstrom:"wi-thunderstrom",
      Drizzle:"wi-sleet",
      Rain:"wi-strom-showers",
      Atmosphere:"wi-fog",
      Clear:"wi-day-sunny",
      Clouds:"wi-day-fog"

    }
  }

calCelsius(temp){
    let cell = Math.floor(temp-273.15);
      return cell;
}

get_WeatherIcon(icons, rangeId){
  switch(true){
    case rangeId>=200&& rangeId <=232:
      this.setState({icon:this.weatherIcon.Thunderstrom});
        break;
    case rangeId>=300&& rangeId <=321:
      this.setState({icon:this.weatherIcon.Drizzle});
        break;
    case rangeId>=500&& rangeId <=531:
      this.setState({icon:this.weatherIcon.Rain});
        break;
    case rangeId>=600&& rangeId <=622:
      this.setState({icon:this.weatherIcon.Snow});
        break;
    case rangeId>=701&& rangeId <=781:
      this.setState({icon:this.weatherIcon.Atmosphere});
        break;
    case rangeId===800:
      this.setState({icon:this.weatherIcon.Clear});
        break;
    case rangeId>=801&& rangeId <=804:
      this.setState({icon:this.weatherIcon.Clouds});
        break;
    default:
      this.setState({icon:this.weatherIcon.Clouds});
  }
}


getWeather = async(e)=>{
  e.preventDefault();

  const city = e.target.elements.city.value;
  const country = e.target.elements.country.value;

if ((city!=null) && (country !=null)) {
  const api_call = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`
    );

  const response = await api_call.json();

  console.log(response);

    this.setState({
        city: `${response.name},${response.sys.country}`,
        celsius: this.calCelsius(response.main.temp),
        temp_max: this.calCelsius(response.main.temp_max),
        temp_min: this.calCelsius(response.main.temp_min),
        description: response.weather[0].description,
        error: false 
    });

    this.get_WeatherIcon(this.weatherIcon,response.weather[0].id);
}else{
  this.setState({error : true});
}
  
};

 
  render(){
    return(
      <div className="App">
        <Form loadweather={this.getWeather} error ={this.state.error}/>
        <Weather 
              city={this.state.city} 
              country={this.state.country} 
              temp_celsius={this.state.celsius}
              temp_max={this.state.temp_max}
              temp_min={this.state.temp_min}
              description={this.state.description} 
              weatherIcon={this.state.icon}
        />
      </div>
    );
  }
}


export default App;