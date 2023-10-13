import React, { useMemo, useRef, useState } from "react";
import classNames from "classnames";
import {
  findMaxColumnValue,
  findMinColumnIndex,
} from "@components/util/waterfull";
import { ICommonComponentProps } from "../type";
import { Context } from "../config-provider/context";
import { Item, IWaterItemPosition, IWaterItemData } from "./item";
import List from "../list";
import "dogc/es/waterfull/style/index.css";

export type IWaterfullProps<T extends IWaterItemData> = {
  prefixCls?: string;
  renderItem: (node: T, itemWidth: number) => React.ReactNode;
  width: number;
  itemGap?: number;
  columns?: number;
  listData?: T[];
  size: number;
  onRefresh?: () => Promise<boolean>;
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
    size,
    onRefresh,
  } = props;
  const { getPrefixCls } = React.useContext(Context);
  const prefixCls = getPrefixCls("waterfull", customPrefixCls);
  const classes = classNames(prefixCls);

  const heightArrRef = useRef<Array<number>>(new Array(columns).fill(0));
  const [maxHeight, setMaxHeight] = useState(0);

  const itemWidth = useMemo(() => {
    return (width - (columns - 1) * itemGap) / columns;
  }, [width, columns, itemGap]);

  const getWaterfallItemPostionInfo = (node: T): IWaterItemPosition => {
    const { imgRatio, extraHeight } = node;

    const itemHeight =
      itemWidth * (imgRatio || 0) + itemGap + (extraHeight || 0);

    const minHeightIndex = findMinColumnIndex(heightArrRef.current);

    const prevMinHeight = heightArrRef.current[minHeightIndex];

    heightArrRef.current[minHeightIndex] += itemHeight;
    const maxHeight = findMaxColumnValue(heightArrRef.current);
    setMaxHeight(maxHeight);
    return {
      index: minHeightIndex,
      top: prevMinHeight,
    };
  };
  return (
    <List containerSize={size} onRefresh={onRefresh}>
      <div
        className={classNames(classes, className)}
        style={{
          width,
          ...style,
          height: maxHeight,
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
              {renderItem(item, itemWidth)}
            </Item>
          );
        })}
      </div>
    </List>

    // </div>
  );
};
export default Waterfull;
