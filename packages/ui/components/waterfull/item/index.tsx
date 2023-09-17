import React, { useMemo } from "react";
import classNames from "classnames";
import { ICommonComponentProps } from "../../type";
import { Context } from "../../config-provider/context";

export interface IWaterItemPosition {
  top: number;
  index: number;
}
export interface IWaterItemData {
  height: number;
  id: string | number;
}
type IWaterfullItemProps<T extends IWaterItemData> = {
  prefixCls?: string;
  node: T;
  getWaterfallItemPostionInfo: (node: T) => IWaterItemPosition;
  width: number;
  itemGap?: number;
  children?: React.ReactNode;
} & ICommonComponentProps;

const Item = <T extends IWaterItemData>(
  props: IWaterfullItemProps<T>
): React.ReactElement => {
  const {
    prefixCls: customPrefixCls,
    node,
    itemGap = 0,
    width,
    getWaterfallItemPostionInfo,
    children,
  } = props;
  const { getPrefixCls } = React.useContext(Context);
  const prefixCls = getPrefixCls("waterfull", customPrefixCls);
  const classes = classNames(prefixCls);
  const positionInfo = useMemo<IWaterItemPosition>(() => {
    return getWaterfallItemPostionInfo(node);
  }, []);

  return (
    <div
      className={classNames(classes)}
      style={{
        position: "absolute",
        top: positionInfo.top,
        left: positionInfo.index * (width + itemGap),
        width,
      }}
    >
      {children}
    </div>
  );
};

export { Item };
