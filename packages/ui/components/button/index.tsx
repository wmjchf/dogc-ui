import React from "react";
import classNames from "classnames";
import { getClassByType } from "../../util/class";
import { ICommonComponentProps } from "../type";
import { Context } from "../config-provider/context";
import "dogc/es/button/style/index.css";

export type IButtonProps = {
  prefixCls?: string;
  children?: React.ReactNode | string;
  type?: "primary" | "success" | "warning" | "danger" | "default";
  hairline?: boolean;
  plain?: boolean;
  disabled?: boolean;
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
    disabled = false,
    onClick,
  } = props;
  const { getPrefixCls } = React.useContext(Context);
  const prefixCls = getPrefixCls("button", customPrefixCls);
  const classes = classNames(prefixCls, {
    [`${getClassByType(prefixCls, type)}`]: true,
    [`${prefixCls}--hairline`]: hairline,
    [`${prefixCls}--plain`]: plain,
    [`${prefixCls}--disabled`]: disabled,
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
