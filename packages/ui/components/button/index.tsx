import React from "react";

export type IButton = {
  text?: string;
};
const Button: React.FC<IButton> = (props) => {
  const { text } = props;
  return <div className="button">{text}</div>;
};
export default Button;
