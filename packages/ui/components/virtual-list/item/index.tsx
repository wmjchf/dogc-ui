import React, { useMemo } from "react";
import classNames from "classnames";
import { ICommonComponentProps } from "../../type";
import { Context } from "../../config-provider/context";

export interface IVirtualItemData {
  id: string | number;
}
type IWaterfullItemProps = {
  prefixCls?: string;

  children?: React.ReactNode;
} & ICommonComponentProps;

const Item = (props: IWaterfullItemProps): React.ReactElement => {
  const { prefixCls: customPrefixCls, style, className, children } = props;
  const { getPrefixCls } = React.useContext(Context);
  const prefixCls = getPrefixCls("waterfull", customPrefixCls);
  const classes = classNames(prefixCls);

  return (
    <div className={classNames(classes, className)} style={style}>
      {children}
    </div>
  );
};

export { Item };
