import axios from "axios";
const baseUrl = import.meta.env.VITE_URL_BASE;
import { NameLocation, LocationInfo, Residents } from "../interface/interfaces";

export const getLocationsName = async (
  name: string
): Promise<LocationInfo[]> => {
  if (!name) {
    throw new Error("No se ha especificado un lugar para explorar");
  }
  const url = `${baseUrl}/?name=${name}`;
  try {
    const response = await axios.get(url);
    const optionsDimension = response.data.results.map(
      (option: NameLocation) => ({
        name: option.name,
        id: option.id,
      })
    );
    const filteredOptions = structuredClone(optionsDimension);
    return filteredOptions;
  } catch (error) {
    throw new Error("Esa dimensión no existe");
  }
};

export const getLocationById = async (id: number): Promise<LocationInfo> => {
  if (!id) {
    throw new Error("No se ha especificado un id valido");
  }
  const url = `${baseUrl}/${id}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error("No se ha especificado un id valido");
  }
};

export const loadResident = async (
  residents: string[]
): Promise<Residents[]> => {
  if (!residents) {
    throw new Error(
      "No se encotraron residentes, hubo un error en la solicitud"
    );
  }
  try {
    const responses = await Promise.all(
      residents.map(async (resident) => {
        const response = await axios.get(resident);
        return response.data;
      })
    );
    return responses;
  } catch (error) {
    throw new Error(
      "Tienes un error al hacer la petición, no podemos mostrar los residentes"
    );
  }
};
