import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import classNames from "classnames";
import { ICommonComponentProps } from "../type";
import { Context } from "../config-provider/context";

export type IPopupProps = {
  prefixCls?: string;
  children?: React.ReactNode | string;
  position?: "top" | "right" | "bottom" | "left";
  selectorId?: string;
} & ICommonComponentProps;

type RootNode = HTMLElement | null;

const Popup: React.FC<IPopupProps> = (props) => {
  const {
    prefixCls: customPrefixCls,
    children,
    className,
    style,
    position,
    selectorId,
  } = props;
  const { getPrefixCls } = React.useContext(Context);
  const prefixCls = getPrefixCls("popup", customPrefixCls);
  const classes = classNames(prefixCls, {});
  const [rootNode, setRootNode] = useState<RootNode>(null);
  useEffect(() => {
    let rootNode: RootNode = null;
    if (selectorId) {
      rootNode = document.getElementById(selectorId);
    } else {
      rootNode = document.getElementsByTagName("body")[0];
    }
    setRootNode(rootNode);
  }, [selectorId]);
  return rootNode && createPortal(<div className={classes}></div>, rootNode);
};
export default Popup;
