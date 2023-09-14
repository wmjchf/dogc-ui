import React from "react";
import classNames from "classnames";
import { getClassByType } from "@components/utls/class";
import { ICommonComponentProps } from "../type";
import { Context } from "../config-provider/context";

export type IEllipsisProps = {
  prefixCls?: string;
  content?: string;
  //   type?: "primary" | "success" | "warning" | "danger" | "default";
  //   hairline?: boolean;
  //   plain?: boolean;
  //   disabled?: boolean;
  //   onClick?: (event: React.SyntheticEvent) => void;
} & ICommonComponentProps;

const Ellipsis: React.FC<IEllipsisProps> = (props) => {
  const { prefixCls: customPrefixCls, className, content, style } = props;
  const { getPrefixCls } = React.useContext(Context);
  const prefixCls = getPrefixCls("ellipsis", customPrefixCls);
  const classes = classNames(prefixCls);
  const inputClasses = `${prefixCls}--input`;
  const textClasses = `${prefixCls}--text`;
  const buttonClasses = `${prefixCls}--button`;
  return (
    <div className={classNames(classes, className)} style={style}>
      <input type="checkbox" id="exp" className={inputClasses}></input>
      <div className={textClasses}>
        <label className={buttonClasses} htmlFor="exp"></label>
        浮动元素是如何定位的正如我们前面提到的那样，当一个元素浮动之后，它会被移出正常的文档流，然后向左或者向右平移，一直平移直到碰到了所处的容器的边框，或者碰到另外一个浮动的元素。或者碰到另外另外一浮动浮。
      </div>
    </div>
  );
};
export default Ellipsis;
