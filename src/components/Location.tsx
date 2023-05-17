import { LocationProps } from "../interface/interfaces";

const Location = ({ locationInfo }: LocationProps) => {
  const { name, type, dimension, residents } = locationInfo;

  return (
    <div className="flex flex-col text-center items-center justify-between gap-3 font-fre sm:w-[500px] md:w-[750px] mx-auto">
      <div className="w-screen md:w-[750px] overflow-hidden rounded-br-3xl rounded-bl-3xl relative">
        <img
          src="public/img/barner.webp"
          alt="barner rick and morty"
          className="blur-[2px] relative min-h-[250px] "
        />
        <section className="flex items-center justify-between flex-col absolute top-0 left-0 right-0 bottom:20 sm:bottom-24 md:bottom-24">
          <h1 className="text-[32px] bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-yellow-200 drop-shadow-md shadow-black p-2">
            {name}
          </h1>
          <div className="flex sm:gap-1 flex-col md:flex-row md:gap-7 text-xl text-gray-700 drop-shadow-md shadow-blackb bg-green-300/40 rounded-3xl p-1">
            <span>
              <b>TYPE: </b> {type}
            </span>
            <span>
              <b>DIMENSION: </b> {dimension}
            </span>
            <span>
              <b>POPULATION: </b> {residents.length}
            </span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Location;
