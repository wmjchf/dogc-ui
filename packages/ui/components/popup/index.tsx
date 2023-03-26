import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import classNames from "classnames";
import { ICommonComponentProps } from "../type";
import { Context } from "../config-provider/context";

export type IPopupProps = {
  prefixCls?: string;
  children?: React.ReactNode | string;
  position?: "top" | "right" | "bottom" | "left";
  selectorId?: string;
  visible?: boolean;
  maskClosable?: boolean;
  onClose?: () => void;
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
    visible = false,
    maskClosable = true,
    onClose,
  } = props;
  const { getPrefixCls } = React.useContext(Context);
  const prefixCls = getPrefixCls("popup", customPrefixCls);
  const [rootNode, setRootNode] = useState<RootNode>(null);
  const [_visible, _setVisible] = useState<boolean>(false);

  const classes = classNames(prefixCls, {});
  const maskClasses = classNames({
    [`${prefixCls}--mask`]: true,
    [`${prefixCls}--mask_open`]: _visible,
  });
  const containerClasses = classNames({
    [`${prefixCls}--container`]: true,
  });
  const bodyClasses = classNames({
    [`${prefixCls}--body`]: true,
    [`${prefixCls}--body_open`]: _visible,
    [`${prefixCls}--body_center`]: !position,
    [`${prefixCls}--body_top`]: position === "top",
    [`${prefixCls}--body_bottom`]: position === "bottom",
    [`${prefixCls}--body_left`]: position === "left",
    [`${prefixCls}--body_right`]: position === "right",
  });

  const divRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const transitionClose = () => {
    if (!_visible) {
      onClose && onClose();
    }
    divRef.current?.removeEventListener("transitionend", transitionClose);
  };
  const isVer = position === "bottom" || position === "top";

  useEffect(() => {
    let rootNode: RootNode = null;
    if (selectorId) {
      rootNode = document.getElementById(selectorId);
    } else {
      rootNode = document.getElementsByTagName("body")[0];
    }
    setRootNode(rootNode);
  }, [selectorId]);

  useEffect(() => {
    _setVisible(visible);
  }, [visible]);

  useEffect(() => {
    divRef.current?.addEventListener("transitionend", transitionClose);
  }, [_visible]);
  const ani = function (
    div: HTMLDivElement,
    target: number,
    direction: -1 | 1
  ) {
    if (!position) return;
    const positionGap = div.style[position].replace("px", "") || "0";

    const positionNum = parseInt(positionGap);
    if (positionNum === target) return;

    div.style[position] =
      direction > 0
        ? `${positionNum + 15 > target ? target : positionNum + 15}px`
        : `${positionNum - 15 < target ? target : positionNum - 15}px`;
    requestAnimationFrame(() => {
      ani(div, target, direction);
    });
  };
  useEffect(() => {
    if (!bodyRef.current || !_visible || !position) return;

    requestAnimationFrame(function () {
      ani(bodyRef.current as HTMLDivElement, 0, 1);
    });
  }, [_visible]);
  const _close = () => {
    _setVisible(false);
    if (!bodyRef.current || !position) return;
    requestAnimationFrame(function () {
      ani(
        bodyRef.current as HTMLDivElement,
        -(isVer
          ? (bodyRef.current?.clientHeight as number)
          : (bodyRef.current?.clientWidth as number)),
        -1
      );
    });
  };
  if (!visible) return <></>;

  return (
    rootNode &&
    createPortal(
      <div className={classes}>
        <div className={maskClasses} ref={divRef}></div>
        <div
          className={containerClasses}
          onClick={() => {
            if (!maskClosable) return;
            _close();
          }}
        >
          <div
            className={bodyClasses}
            ref={bodyRef}
            style={{
              [position || ""]: `-${
                isVer
                  ? bodyRef.current?.clientHeight || 0
                  : bodyRef.current?.clientWidth || 0
              }px`,
            }}
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            {children}
          </div>
        </div>
      </div>,
      rootNode
    )
  );
};
export default Popup;
