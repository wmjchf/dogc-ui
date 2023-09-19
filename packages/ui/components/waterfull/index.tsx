import React, { useMemo, useRef } from "react";
import classNames from "classnames";
import { findMinColumnIndex } from "@components/util/waterfull";
import { ICommonComponentProps } from "../type";
import { Context } from "../config-provider/context";
import { Item, IWaterItemPosition, IWaterItemData } from "./item";
import "dogc/es/virtual-list/style/index.css";

export type IWaterfullProps<T extends IWaterItemData> = {
  prefixCls?: string;
  renderItem: (node: T) => React.ReactNode;
  width: number;
  itemGap?: number;
  columns?: number;
  listData?: T[];
} & ICommonComponentProps;

const Waterfull = <T extends IWaterItemData>(
  props: IWaterfullProps<T>
): React.ReactElement => {
  const {
    prefixCls: customPrefixCls,
    className,
    style = {},
    columns = 2,
    width,
    itemGap = 0,
    listData = [],
    renderItem,
  } = props;
  const { getPrefixCls } = React.useContext(Context);
  const prefixCls = getPrefixCls("waterfull", customPrefixCls);
  const classes = classNames(prefixCls);

  const heightArrRef = useRef<Array<number>>(new Array(columns).fill(0));

  const itemWidth = useMemo(() => {
    return (width - (columns - 1) * itemGap) / columns;
  }, [width, columns, itemGap]);

  //   const inputClasses = `${prefixCls}--input`;
  //   const contentClasses = `${prefixCls}--text`;
  //   const slideClasses = `${prefixCls}--slide`;
  //   const buttonClasses = `${prefixCls}--button`;
  const getWaterfallItemPostionInfo = (node: T): IWaterItemPosition => {
    const { height } = node;

    const itemHeight = height + itemGap;

    const minHeightIndex = findMinColumnIndex(heightArrRef.current);
    const prevMinHeight = heightArrRef.current[minHeightIndex];
    heightArrRef.current[minHeightIndex] += itemHeight;

    return {
      index: minHeightIndex,
      top: prevMinHeight,
    };
  };
  return (
    <div
      className={classNames(classes, className)}
      style={{
        width,
        ...style,
      }}
    >
      {listData.map((item) => {
        return (
          <Item
            width={itemWidth}
            key={item.id}
            node={item}
            itemGap={itemGap}
            getWaterfallItemPostionInfo={getWaterfallItemPostionInfo}
          >
            {renderItem(item)}
          </Item>
        );
      })}
    </div>
  );
};
export default Waterfull;
