import React from "react";
import classNames from "classnames";
import { Context } from "../config-provider/context";
export type IButton = {
  text?: string;
  prefixCls?: string;
};
const Button: React.FC<IButton> = (props) => {
  const { text, prefixCls: customPrefixCls } = props;
  const { getPrefixCls } = React.useContext(Context);
  const prefixCls = getPrefixCls("button", customPrefixCls);
  const classes = classNames(prefixCls, {
    [`${prefixCls}-haha`]: true,
  });
  return <button className={classes}>{text}</button>;
};
export default Button;
