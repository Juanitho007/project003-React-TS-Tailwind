import { SearchProps } from "../interface/interfaces";

const Search = ({
  handleInput,
  input,
  optionsLocations,
  handleSelect,
}: SearchProps) => {
  return (
    <div className="p-2 w-2xl flex flex-col items-center justify-between">
      <section className="mx-auto">
        <i className="bx bxs-planet bx-tada text-3xl p-2"></i>
        <input
          className="rounded-3xl p-3 border-x-cyan-600 border-4 w-[250px] sm:w-[500px] md:w-[750px] "
          type="text"
          name="dimension"
          placeholder="Search dimension...."
          onChange={handleInput}
          value={input}
        />
      </section>
      <div className="p-4">
        {optionsLocations.length > 0 && (
          <ul className="flex flex-col p-4 bg-cyan-300 rounded-3xl text-white font-semibold sm:w-[500px] md:w-[750px] ">
            {optionsLocations.map((option: { id: number; name: string }) => (
              <li
                className="border-b-[0.5px] border-b-white border-opacity-50"
                key={option.id}
                onClick={() => handleSelect(option.id)}
              >
                {option.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Search;
