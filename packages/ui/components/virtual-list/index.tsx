import React from "react";
import classNames from "classnames";

import { ICommonComponentProps } from "../type";
import { Context } from "../config-provider/context";
import { Item, IVirtualItemData } from "./item";
import "dogc/es/virtual-list/style/index.css";

export type IVirtualListProps<T extends IVirtualItemData> = {
  prefixCls?: string;
  renderItem: (node: T) => React.ReactNode;
  listData?: T[];
  size: number;
  itemSize: number;
} & ICommonComponentProps;

const VirtualList = <T extends IVirtualItemData>(
  props: IVirtualListProps<T>
): React.ReactElement => {
  const {
    prefixCls: customPrefixCls,
    className,
    style = {},
    listData = [],
    size,
    renderItem,
  } = props;
  const { getPrefixCls } = React.useContext(Context);
  const prefixCls = getPrefixCls("virtual-list", customPrefixCls);
  const classes = classNames(prefixCls);
  const listClasses = `${prefixCls}--list`;
  //   const contentClasses = `${prefixCls}--text`;
  //   const slideClasses = `${prefixCls}--slide`;
  //   const buttonClasses = `${prefixCls}--button`;

  return (
    <div
      className={classNames(classes, className)}
      style={{
        ...style,
        height: size,
      }}
    >
      <div className={listClasses}>
        {listData.map((item) => {
          return <Item key={item.id}>{renderItem(item)}</Item>;
        })}
      </div>
    </div>
  );
};
export default VirtualList;
