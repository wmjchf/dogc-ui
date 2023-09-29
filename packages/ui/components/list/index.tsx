import React from "react";
import classNames from "classnames";
import { ICommonComponentProps } from "../type";
import { Context } from "../config-provider/context";
import "dogc/es/list/style/index.css";

export type IListProps = {
  prefixCls?: string;
} & ICommonComponentProps;

const List: React.FC<IListProps> = (props) => {
  const { prefixCls: customPrefixCls, className, style = {} } = props;
  const { getPrefixCls } = React.useContext(Context);
  const prefixCls = getPrefixCls("list", customPrefixCls);
  const classes = classNames(prefixCls);
  return <div className={classNames(classes, className)}></div>;
};

export default List;
