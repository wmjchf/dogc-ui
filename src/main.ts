interface IPerson {
  name: string;
  age: number;
}

export const formatW = (str: IPerson) => {
  return str.name;
};
