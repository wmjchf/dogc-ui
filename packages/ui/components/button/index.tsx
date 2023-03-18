import React from "react";
import classNames from "classnames";
import { ICommonComponentProps } from "@components/type";
import { Context } from "../config-provider/context";

export type IButton = {
  prefixCls?: string;
  children?: React.ReactNode | string;
} & ICommonComponentProps;

const Button: React.FC<IButton> = (props) => {
  const { prefixCls: customPrefixCls, children, className, style } = props;
  const { getPrefixCls } = React.useContext(Context);
  const prefixCls = getPrefixCls("button", customPrefixCls);
  const classes = classNames(prefixCls, {
    [`${prefixCls}`]: true,
  });
  return (
    <button className={classNames(classes, className)} style={style}>
      {children}
    </button>
  );
};
export default Button;
