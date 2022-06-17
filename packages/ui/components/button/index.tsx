export type IButton = {
  text?: string;
};
const Button: React.FC<IButton> = (props) => {
  const { text } = props;
  return <div>{text}</div>;
};
export default Button;
