export interface NameLocation {
  name: string;
  id: number;
}
export interface LocationInfo {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
}
export interface Residents {
  id: number | string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
  episode: string[];
}
export interface LocationProps{
  locationInfo: LocationInfo;
}
export interface SearchProps {
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  input: string;
  optionsLocations: NameLocation[];
  handleSelect: (id: number) => void;
}
export interface ResidentProps{
  urlResident: string;
}