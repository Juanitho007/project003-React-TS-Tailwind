import { useEffect,useState } from "react";
import {Residents, ResidentProps } from "../interface/interfaces";
import { loadResident } from "../services/getLocationsAndResidents";

const ResidentInfo = ({ urlResident }: ResidentProps) => {
  //Guarda el estado de los residentes del lugar
  const [resident, setResident] = useState<Residents>();

  //Obtiene los residentes de la ubicacion
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await loadResident(urlResident);
        setResident(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [urlResident]);

  return (
    <>
      {resident ? (
        <div
          className={`p-3 rounded-3xl border-4 border-gray-700 ${
            resident.status && resident.status === "Alive"
              ? "bg-green-400 opacity-100"
              : resident.status === "unknown"
              ? "bg-gray-400 opacity-90"
              : resident.status === "Dead"
              ? "bg-red-600 opacity-80"
              : "bg-white opacity-100"
          }`}
        >
          <section className="rounded-2xl overflow-hidden relative">
            <img src={resident.image} alt={resident.name} />
            <div className="flex items-center p-2 rounded-br-3xl bg-slate-800 text-white gap-2 absolute top-8">
              <p
                className={`h-4 w-4 rounded-full ${
                  resident.status && resident.status === "Alive"
                    ? "bg-green-400"
                    : resident.status === "unknown"
                    ? "bg-gray-400"
                    : resident.status === "Dead"
                    ? "bg-red-600"
                    : "bg-white"
                }`}
              ></p>
              {resident.status.toUpperCase()}
            </div>
          </section>
          <section className="flex flex-col text-start">
            <h2 className="font-bold w-full border-b-2 border-black">
              {resident.name}
            </h2>
            <span>
              <b>Species: </b> {resident.species}
            </span>
            <span>
              <b>Type: </b> {resident.type === "" ? "unknown" : resident.type}
            </span>
            <span>
              <b>Gender: </b> {resident.gender}
            </span>
            <span>
              <b>Episodes:</b> {resident.episode.length}
            </span>
          </section>
        </div>
      ) : (
        <span className="loader"></span>
      )}
    </>
  );
};

export default ResidentInfo;
