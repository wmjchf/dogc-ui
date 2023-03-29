import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import classNames from "classnames";
import { ICommonComponentProps } from "../type";
import { Context } from "../config-provider/context";

export type IImageProps = {
  prefixCls?: string;
  children?: React.ReactNode | string;
} & ICommonComponentProps;

const Popup: React.FC<IImageProps> = (props) => {
  const { prefixCls: customPrefixCls, children, className, style } = props;
  const { getPrefixCls } = React.useContext(Context);
  const prefixCls = getPrefixCls("image", customPrefixCls);

  const classes = classNames(prefixCls, {});

  return <img></img>;
};
export default Popup;
