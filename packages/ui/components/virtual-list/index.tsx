import React, {
  TouchEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  WheelEventHandler,
} from "react";
import classNames from "classnames";

import { ICommonComponentProps } from "../type";
import { Context } from "../config-provider/context";
import { Item, IVirtualItemData } from "./item";
import List from "../list";
import "dogc/es/virtual-list/style/index.css";

export type IVirtualListProps<T extends IVirtualItemData> = {
  prefixCls?: string;
  renderItem: (node: T) => React.ReactNode;
  size: number;
  itemSize: number;
  listData?: T[];
  onRefresh?: () => Promise<boolean>;
} & ICommonComponentProps;

const VirtualList = <T extends IVirtualItemData>(
  props: IVirtualListProps<T>
): React.ReactElement => {
  const {
    prefixCls: customPrefixCls,
    className,
    style = {},
    size,
    itemSize,
    listData = [],
    renderItem,
    onRefresh,
  } = props;
  const { getPrefixCls } = React.useContext(Context);
  const prefixCls = getPrefixCls("virtual", customPrefixCls);
  const classes = classNames(prefixCls);

  const count = useMemo(() => {
    return size / itemSize + 10;
  }, []);

  const listHeight = useMemo(() => {
    return itemSize * listData.length;
  }, [listData]);

  const [startIndex, setStartIndex] = useState(0);

  const handleScroll: TouchEventHandler<HTMLDivElement> = function (event) {
    const scrollTop = event.currentTarget?.scrollTop || 0;
    const startIndex = Math.floor(scrollTop / itemSize);
    setStartIndex(startIndex);
  };
  const handleWheel: WheelEventHandler = function (event) {
    const scrollTop = event.currentTarget?.scrollTop || 0;
    const startIndex = Math.floor(scrollTop / itemSize);
    setStartIndex(startIndex);
  };

  return (
    <List
      containerSize={size}
      onTouchMove={handleScroll}
      onRefresh={onRefresh}
      onWheel={handleWheel}
    >
      <div
        className={classNames(classes, className)}
        style={{
          ...style,
          height: listHeight - startIndex * itemSize,
          transform: `translate3d(0,${startIndex * itemSize}px,0)`,
        }}
      >
        {listData.slice(startIndex, startIndex + count).map((item) => {
          return (
            <Item key={item.id} itemSize={itemSize}>
              {renderItem(item)}
            </Item>
          );
        })}
      </div>
    </List>
  );
};
export default VirtualList;
