import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer'

const Weather = () => {
  const [mainLocation, setMainLocation] = useState({});
  const [locations, setLocations] = useState([]);

  const apiKey = 'dec7dba29479ec21c563c26c214b007b'; 
  const mainLocationName = 'Ado-odo'; 
  const additionalLocations = ['Lagos', 'Oyo', 'Ilaro', 'ifo',  'Badagry', 'Ikeja', 'Owode', 'Sagamu', 'Epe', 'Abeokuta', 'Abuja', 'Akure']; 

  useEffect(() => {
    
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${mainLocationName}&appid=${apiKey}`)
      .then((response) => {
        setMainLocation(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    
    const fetchAdditionalLocations = async () => {
      const locationData = await Promise.all(
        additionalLocations.map(async (location) => {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`
          );
          return response.data;
        })
      );
      setLocations(locationData);
    };

    fetchAdditionalLocations();
  }, [apiKey, mainLocationName, additionalLocations]);

  return (
    <div  className="h-100 bg-cover bg-center relative"
    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1580193769210-b8d1c049a7d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHdlYXRoZXIlMjBhcHB8ZW58MHwwfDB8fHwy&auto=format&fit=crop&w=500&q=60')` }}
  >
    <Header />
    <div className="container mx-auto p-[39px]">
      <div className=" w-1/3 text-center mx-auto p-4 mb-8 bg-opacity-20 backdrop-blur-md bg-blue-500   rounded-lg shadow-lg ">
          <h2 className="text-lg text-center font-bold text-white mb-2">{mainLocationName}</h2>
          {mainLocation.main && (
            <p className="text-3xl font-bold text-white">{`${(mainLocation.main.temp - 273.15).toFixed(2)}°C`}</p>

            
          )}

          
        </div>
      <div className="grid grid-cols-3 p-4 gap-4">
       
        {locations.map((location, index) => (
          <div key={index} className="bg-opacity-20 backdrop-blur-md bg-blue-500  p-4 rounded-lg shadow-lg text-center">
            <h2 className="text-lg text-white font-bold mb-2">{additionalLocations[index]}</h2>
            {location.main && (
              <p className="text-2xl text-white font-bold">{`${(location.main.temp - 273.15).toFixed(2)}°C`}</p>
            )}
          <div className='grid grid-cols-3 p-4 gap-4'>
            <p className='text-center text-white font-bold'>H - {location.main.humidity}</p>
            <p className='text-center text-white font-bold'>P - {location.main.pressure}</p>
            <p className='text-center text-white font-bold'>W -{location.wind.speed}</p>
            
          </div>
          </div>
        ))}
      </div>
    </div>
    
    <Footer />
    </div>
  );
};

export default Weather;
