import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { ICommonComponentProps } from "../type";
import { Context } from "../config-provider/context";
import "dogc/es/ellipsis/style/index.css";

export type IEllipsisProps = {
  prefixCls?: string;
  content: string;
  contentClass?: string;
  //   type?: "primary" | "success" | "warning" | "danger" | "default";
  //   hairline?: boolean;
  //   plain?: boolean;
  //   disabled?: boolean;
  //   onClick?: (event: React.SyntheticEvent) => void;
} & ICommonComponentProps;

const Ellipsis: React.FC<IEllipsisProps> = (props) => {
  const {
    prefixCls: customPrefixCls,
    className,
    content,
    contentClass,
    style,
  } = props;
  const { getPrefixCls } = React.useContext(Context);
  const prefixCls = getPrefixCls("ellipsis", customPrefixCls);
  const classes = classNames(prefixCls);
  const inputClasses = `${prefixCls}--input`;
  const contentClasses = `${prefixCls}--text`;
  const slideClasses = `${prefixCls}--slide`;
  const buttonClasses = `${prefixCls}--button`;
  const labelRef = useRef<HTMLLabelElement>(null);
  const [marginBottom, setMarginBottom] = useState(0);
  useEffect(() => {
    setMarginBottom(labelRef?.current?.offsetHeight as number);
  }, []);
  return (
    <div className={classNames(classes, className)} style={style}>
      <input type="checkbox" id="exp" className={inputClasses}></input>
      <div className={classNames(contentClasses, contentClass)}>
        <div
          className={slideClasses}
          style={{ marginBottom: -marginBottom }}
        ></div>
        <label className={buttonClasses} htmlFor="exp" ref={labelRef}></label>
        {content}
      </div>
    </div>
  );
};
export default Ellipsis;
