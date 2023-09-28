import React from "react";
import classNames from "classnames";
import { ICommonComponentProps } from "../type";
import { Context } from "../config-provider/context";
import "dogc/es/loading/style/index.css";

export type ILoadingProps = {
  prefixCls?: string;

  size?: number;
  activeColor?: string;
  noActiveColor?: string;
  loadingWidth?: number;
} & ICommonComponentProps;

const Loading: React.FC<ILoadingProps> = (props) => {
  const {
    prefixCls: customPrefixCls,
    className,
    style = {},
    size = 24,
    activeColor = "#ff3d00",
    noActiveColor = "#fff",
    loadingWidth = 2.5,
  } = props;
  const { getPrefixCls } = React.useContext(Context);
  const prefixCls = getPrefixCls("loading", customPrefixCls);
  const classes = classNames(prefixCls, {
    [`${prefixCls}--default`]: true,
  });
  return (
    <span
      className={classNames(classes, className)}
      style={{
        ...style,
        borderColor: noActiveColor,
        borderBottomColor: activeColor,
        width: size,
        height: size,
        borderWidth: loadingWidth,
      }}
    ></span>
  );
};
export default Loading;
