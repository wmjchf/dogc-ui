import React from "react";
import classNames from "classnames";
import { getClassByType } from "@components/utls/class";
import { ICommonComponentProps } from "../type";
import { Context } from "../config-provider/context";

export type IButtonProps = {
  prefixCls?: string;
  children?: React.ReactNode | string;
  type?: "primary" | "success" | "warning" | "danger" | "default";
  hairline?: boolean;
  plain?: boolean;
  onClick?: (event: React.SyntheticEvent) => void;
} & ICommonComponentProps;

const Button: React.FC<IButtonProps> = (props) => {
  const {
    prefixCls: customPrefixCls,
    children,
    className,
    style,
    type = "default",
    hairline = false,
    plain = false,
    onClick,
  } = props;
  const { getPrefixCls } = React.useContext(Context);
  const prefixCls = getPrefixCls("button", customPrefixCls);
  const classes = classNames(prefixCls, {
    [`${prefixCls}`]: true,
    [`${getClassByType(prefixCls, type)}`]: true,
    [`${prefixCls}--hairline`]: hairline,
    [`${prefixCls}--plain`]: plain,
  });
  return (
    <button
      className={classNames(classes, className)}
      style={style}
      onClick={(event) => {
        onClick && onClick(event);
      }}
    >
      {children}
    </button>
  );
};
export default Button;
