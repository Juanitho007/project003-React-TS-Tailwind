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
import { usePagination } from "./hooks/usePagination";

const App = () => {
  const [id, setId] = useState<number>(getRandomNumber(0, 126));
  const [locationInfo, setLocationInfo] = useState<LocationInfo>();
  const [optionsLocations, setOptionsLocations] = useState<NameLocation[]>([]);
  const [input, setInput] = useState<string>("");
  const [urlResidents, setUrlResidents] = useState<string[]>([]);
  const [quantityPagination, setQuantityPagination] = useState<number>(5);
  const [pageNumber, listSlice, pages, changePageTo] = usePagination(
    urlResidents,
    quantityPagination
  );

  useEffect(() => {
    while (id === locationInfo?.id) {
      setId(getRandomNumber(0, 126));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLocationById(id);
        setLocationInfo(data);
        setUrlResidents(data.residents);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  const handleInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSelect = (id: number) => {
    setId(id);
    setOptionsLocations([]);
    setInput("");
  };

  return (
    <>
      {locationInfo ? (
        <div className="min-h-screen min-w-full text-center mx-auto bg-gradient-to-r from-sky-400 from-10% via-yellow-200 via-60% to-green-400 to-90%">
          <Location locationInfo={locationInfo} />
          <Search
            handleInput={handleInput}
            input={input}
            optionsLocations={optionsLocations}
            handleSelect={handleSelect}
          />
          {listSlice?.length === 0 ? (
            <section className="max-w-[400px] mx-auto">
              <p className="text-2xl font-semibold text-white">
                No hay residentes en esta dimensión
              </p>
              <img src="/img/rick3.png" alt="logo Rick and Morty" />
            </section>
          ) : (
            <>
              {pages.length > 1 && (
                <>
                  <div className="flex flex-wrap items-center justify-center text-center max-w-[900px] mx-auto gap-4">
                    <button
                      onClick={() => changePageTo(pageNumber - 1)}
                      className="bg-green-500/70 rounded-full w-12 h-12"
                    >
                      <i className="bx bxs-skip-previous-circle text-3xl text-cyan-800"></i>
                    </button>
                    {pages.map((i: number) => (
                      <button
                        key={i}
                        onClick={() => changePageTo(i)}
                        style={{
                          color: pageNumber === i ? "yellow" : undefined,
                        }}
                        className=" text-xl p-2 bg-green-500/70 rounded-full w-12 h-12"
                      >
                        {i}
                      </button>
                    ))}
                    <button
                      onClick={() => changePageTo(pageNumber + 1)}
                      className="bg-green-500/70 rounded-full w-12 h-12"
                    >
                      <i className="bx bxs-skip-next-circle text-3xl text-cyan-800"></i>
                    </button>
                  </div>
                  <div className="pb-4">
                    <select
                      name="quantityPerPages"
                      value={quantityPagination}
                      onChange={(e) =>
                        setQuantityPagination(Number(e.target.value))
                      }
                    >
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="15">15</option>
                      <option value="20">20</option>
                    </select>
                  </div>
                </>
              )}
              <section className="grid grid-cols-fluid gap-4 items-center  justify-items-center max-w-[900px] mx-auto">
                {listSlice?.map((resident) => (
                  <ResidentInfo key={resident} urlResident={resident} />
                ))}
              </section>
            </>
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
