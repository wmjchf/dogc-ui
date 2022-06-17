export type IImaage = {
  src?: string;
};

const Image: React.FC<IImaage> = (props) => {
  const { src } = props;
  return <div>{src}</div>;
};

export default Image;
