import React from "react";
import classNames from "classnames";
import { ICommonComponentProps } from "../../type";
import { Context } from "../../config-provider/context";

export interface IListItemData {
  id: string | number;
}
type IListItemProps<T extends IListItemData> = {
  prefixCls?: string;
  children?: React.ReactNode;
  data?: T;
} & ICommonComponentProps;

const Item = <T extends IListItemData>(
  props: IListItemProps<T>
): React.ReactElement => {
  const { prefixCls: customPrefixCls, style = {}, className, children } = props;
  const { getPrefixCls } = React.useContext(Context);
  const prefixCls = getPrefixCls("list-item", customPrefixCls);
  const classes = classNames(prefixCls);

  return (
    <div className={classNames(classes, className)} style={style}>
      {children}
    </div>
  );
};

export { Item };
