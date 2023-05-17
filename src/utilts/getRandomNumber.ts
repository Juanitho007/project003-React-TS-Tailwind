export const getRandomNumber = (min: number, max:number) => {
  const amplitude = Math.abs(max - min);
  return min + Math.round(Math.random() * amplitude);
};
