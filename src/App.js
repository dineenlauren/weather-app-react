import { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

function App() {

  const [apiData, setApiData] = useState({});
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [getCity, setGetCity] = useState('Dallas');
  const [city, setCity] = useState('Dallas');
  // const city = useState('Dallas');

  // API KEY AND URL
  const apiKey = 'e1d3bf274775b99b6873fda0ede019f4';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });


    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setApiData(data));

    console.log("Latitude is:", lat)
    console.log("Longitude is:", long)
  }, [apiUrl, lat, long]);

  const inputHandler = (event) => {
    setGetCity(event.target.value);

  };

  const submitHandler = () => {
    setCity(getCity);
  };

  const kelvinToFarenheit = (k) => {
    return (k - 273.15).toFixed(2);
  };

  const [radioValue, setRadioValue] = useState('1');
  const radios = [
    { name: 'F\u00B0', value: '1' },
    { name: 'C\u00B0', value: '2' },
  ];



  return (
    <Container className="App">
      <div className="title mb-3">
        <h1>
          {' '}
          {apiData.name}
        </h1>
      </div>

      <div className="col-auto">
        <input
          type="text"
          id="location-name"
          className="form-control"
          onChange={inputHandler}
          value={getCity}
        />
      </div>
      <button className="btn btn-primary mt-2" onClick={submitHandler}>
        Search
      </button>
      {apiData.main ? (
        <Container className="weather-container py-0">
          <Container className="current-container pt-5">
            <Row>
              <Col>
                <p className="h5">
                  <i className="fas fa-map-marker-alt"></i>{' '}
                  {apiData.name}
                </p>
              </Col>
              <Col>
                <ButtonGroup className="mb-2">
                  {radios.map((radio, idx) => (
                    <ToggleButton
                      key={idx}
                      id={`radio-${idx}`}
                      type="radio"
                      variant="secondary"
                      name="radio"
                      value={radio.value}
                      checked={radioValue === radio.value}
                      onChange={(e) => setRadioValue(e.currentTarget.value)}

                    >

                      {radio.name}
                    </ToggleButton>
                  ))}
                </ButtonGroup>
              </Col>
            </Row>
            <Row className="current-weather py-2">
              <Col>
                <Row>
                  <Col>
                    <p>
                      {' '}
                      {apiData.weather[0].main}
                    </p>
                  </Col>
                  <Col>
                    <p className="h2">
                      {Math.round(apiData.main.temp)}F&deg;
                    </p>
                  </Col>
                  <Col>
                    <img
                      src={`http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`}
                      alt="weather status icon"
                      className="weather-icon"
                    />
                  </Col>
                </Row>
              </Col>

              <Col>
              </Col>
            </Row>
          </Container>
          {/**** FORECAST CONTAINER ****/}
          <Container>
            <Row>
              <Col>

              </Col>
            </Row>

          </Container>
        </Container>
      ) : (
        <h1>Loading</h1>
      )} {/* APPDATA END */}

      <footer className="footer">

      </footer>
    </Container>
  );
}

export default App;