import { useState, useEffect } from "react";
import {
  getLocationsName,
  getLocationById,
} from "./services/getLocationsAndResidents";
import { LocationInfo, NameLocation } from "./interface/interfaces";
import { getRandomNumber } from "./utilts/getRandomNumber";
import Location from "./components/Location";
import Search from "./components/Search";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import ResidentInfo from "./components/ResidentInfo";

const App = () => {
  //Guarda el estado del ID
  const [id, setId] = useState<number>(getRandomNumber(0, 126));
  //Guarda el estado de la ubicación del lugar
  const [locationInfo, setLocationInfo] = useState<LocationInfo>();
  //Guarda el estado de los nombres de las ubicaciones sugeridas conforme escribimos
  const [optionsLocations, setOptionsLocations] = useState<NameLocation[]>([]);
  //Guarda el estado del nombre que escribimos
  const [input, setInput] = useState<string>("");

  //Genera un id aleatorio y se asegura que no sea el mismo que el anterior
  useEffect(() => {
    while (id === locationInfo?.id) {
      setId(getRandomNumber(0, 126));
    }
  }, []);

  //Obtiene la ubicación del lugar por Id
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLocationById(id);
        setLocationInfo(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  //Maneja el input, con el fin de mostrar ubicaciones sugeridas de acuerdo al input
  const handleInput = async (e: { target: { value: string } }) => {
    const value = e.target.value;
    setInput(value);
    if (value.trim() !== "") {
      const fetchData = async () => {
        try {
          const data = await getLocationsName(value);
          setOptionsLocations(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    } else {
      setOptionsLocations([]);
    }
  };

  //Cambia el Id de acuerdo al nombre de la ubicación seleccionado
  const handleSelect = (id: number) => {
    setId(id);
    setOptionsLocations([]);
    setInput("");
  };
  return (
    <>
      {locationInfo ? (
        <div className="min-h-screen min-w-full flex flex-col justify-between items-center text-center mx-auto bg-gradient-to-r from-sky-400 from-10% via-yellow-200 via-60% to-green-400 to-90%">
          {locationInfo && <Location locationInfo={locationInfo} />}
          <Search
            handleInput={handleInput}
            input={input}
            optionsLocations={optionsLocations}
            handleSelect={handleSelect}
          />
          {!locationInfo.residents.length && (
            <section>
              <p className="text-2xl font-semibold text-white">
                No hay residentes en esta dimension
              </p>
              <img src="/img/rick3.png" alt="logo Rick and Morty" />
            </section>
          )}
          {locationInfo.residents && (
            <section className="grid  grid-cols-fluid gap-4">
              {locationInfo.residents.map((urlResident) => (
                <ResidentInfo key={urlResident} urlResident={urlResident} />
              ))}
            </section>
          )}
          <Footer />
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default App;
