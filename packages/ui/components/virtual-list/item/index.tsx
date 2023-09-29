import React from "react";
import classNames from "classnames";
import { ICommonComponentProps } from "../../type";
import { Context } from "../../config-provider/context";

export interface IVirtualItemData {
  id: string | number;
}
type IVirtualItemProps = {
  prefixCls?: string;
  children?: React.ReactNode;
  itemSize: number;
} & ICommonComponentProps;

const Item = (props: IVirtualItemProps): React.ReactElement => {
  const {
    prefixCls: customPrefixCls,
    style = {},
    className,
    children,
    itemSize,
  } = props;
  const { getPrefixCls } = React.useContext(Context);
  const prefixCls = getPrefixCls("virtual-item", customPrefixCls);
  const classes = classNames(prefixCls);

  return (
    <div
      className={classNames(classes, className)}
      style={{
        height: itemSize,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export { Item };
