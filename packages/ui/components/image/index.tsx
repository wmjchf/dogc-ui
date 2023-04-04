import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { handleUnit } from "@components/utls/unit";

import { ICommonComponentProps } from "../type";
import { Context } from "../config-provider/context";

import ErrorImage from "./img/error.png";
import PlaceholderImage from "./img/placeholder.png";

export type IImageProps = {
  prefixCls?: string;
  children?: React.ReactNode | string;
  placeholder?: React.ReactNode;
  errorIcon?: React.ReactNode;
  fit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  position?: "center" | "top" | "right" | "bottom" | "left";
  width: number | string;
  height: number | string;
  showPlaceholder?: boolean;
} & ICommonComponentProps &
  React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >;

const Popup: React.FC<IImageProps> = (props) => {
  const {
    prefixCls: customPrefixCls,
    children,
    className,
    width,
    height,
    src,
    alt,
    style = {},
    placeholder,
    errorIcon,
    fit,
    position,
    showPlaceholder = false,
    onLoad,
    onError,
  } = props;
  const { getPrefixCls } = React.useContext(Context);
  const prefixCls = getPrefixCls("image", customPrefixCls);

  const classes = classNames(prefixCls, className, {});

  const placeholderClasses = classNames({
    [`${prefixCls}--placeholder`]: true,
  });
  const errorClasses = classNames({
    [`${prefixCls}--error`]: true,
  });

  const imageClasses = classNames({
    [`${prefixCls}--fill`]: fit === "fill",
    [`${prefixCls}--contain`]: fit === "contain",
    [`${prefixCls}--cover`]: fit === "cover",
    [`${prefixCls}--scale-down`]: fit === "scale-down",
    [`${prefixCls}--none`]: fit === "none",

    [`${prefixCls}--left`]: position === "left",
    [`${prefixCls}--right`]: position === "right",
    [`${prefixCls}--center`]: position === "center",
    [`${prefixCls}--top`]: position === "top",
    [`${prefixCls}--bottom`]: position === "bottom",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const _onLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setLoading(false);
    onLoad && onLoad(event);
  };

  const _onError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setError(true);
    onError && onError(event);
  };

  const renderImage = () => {
    const _style = loading
      ? {
          display: "none",
        }
      : {};
    return (
      <img
        className={imageClasses}
        src={src}
        alt={alt}
        style={_style}
        onLoad={_onLoad}
        onError={_onError}
      />
    );
  };

  const renderPlaceholder = () => {
    if (loading && !error && showPlaceholder) {
      return (
        <div className={placeholderClasses}>
          <img src={PlaceholderImage} alt="" />
        </div>
      );
    }
    return <></>;
  };

  const renderError = () => {
    if (error) {
      return (
        <div className={errorClasses}>
          <img src={ErrorImage} alt="" />
        </div>
      );
    }
    return <></>;
  };

  return (
    <div
      className={classes}
      style={{
        ...style,
        width: handleUnit(width),
        height: handleUnit(height),
      }}
    >
      {renderImage()}
      {renderPlaceholder()}
      {renderError()}
    </div>
  );
};
export default Popup;
