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
  estimateItemSize: number;
  listData?: T[];
  onRefresh?: () => Promise<boolean>;
} & ICommonComponentProps;

type IPosition = {
  index: number;
  height: number;
  top: number;
  bottom: number;
  dHeight: number;
};

const VirtualList = <T extends IVirtualItemData>(
  props: IVirtualListProps<T>
): React.ReactElement => {
  const {
    prefixCls: customPrefixCls,
    className,
    style = {},
    size,
    estimateItemSize,
    listData = [],
    renderItem,
    onRefresh,
  } = props;
  const { getPrefixCls } = React.useContext(Context);
  const prefixCls = getPrefixCls("virtual", customPrefixCls);
  const classes = classNames(prefixCls);

  const positionList = useRef<IPosition[]>([]);
  const virtualRef = useRef<HTMLDivElement>(null);
  const initPositions = () => {
    const _positionList = [];
    for (let i = 0; i < listData.length; i++) {
      _positionList.push({
        index: i,
        height: estimateItemSize,
        top: i * estimateItemSize,
        bottom: (i + 1) * estimateItemSize,
        dHeight: 0,
      });
    }
    positionList.current = _positionList;
  };

  const count = useMemo(() => {
    return size / estimateItemSize + 10;
  }, []);

  const [listHeight, setListHeight] = useState(0);

  const [startIndex, setStartIndex] = useState(0);
  // 二分查找
  const binarySearch = (list: IPosition[], value: number) => {
    let start = 0;
    let end = list.length - 1;
    let tempIndex = -1;
    while (start <= end) {
      const midIndex = parseInt(String((start + end) / 2));
      const midValue = list[midIndex].bottom;
      if (midValue === value) {
        return midIndex + 1;
      } else if (midValue < value) {
        start = midIndex + 1;
      } else if (midValue > value) {
        if (tempIndex === -1 || tempIndex > midIndex) {
          tempIndex = midIndex;
        }
        end = end - 1;
      }
    }
    return tempIndex;
  };

  const handleScroll: TouchEventHandler<HTMLDivElement> = function (event) {
    const scrollTop = event.currentTarget?.scrollTop || 0;
    const startIndex = binarySearch(positionList.current, scrollTop);
    setStartIndex(startIndex);
  };
  const handleWheel: WheelEventHandler = function (event) {
    const scrollTop = event.currentTarget?.scrollTop || 0;
    const startIndex = binarySearch(positionList.current, scrollTop);
    setStartIndex(startIndex);
  };
  const setPosition = () => {
    if (!virtualRef.current) return;
    const nodes = virtualRef.current.children;
    for (let i = 0; i < nodes.length; i++) {
      const nodeRect = nodes[i].getBoundingClientRect();
      const index = +nodes[i].id;
      const oldHeight = positionList.current[index].height; // 旧的高度
      const dHeight = oldHeight - nodeRect.height; // 差值
      if (dHeight) {
        positionList.current[index].bottom = nodeRect.bottom;
        positionList.current[index].height = nodeRect.height;
        positionList.current[index].dHeight = dHeight;
      }
    }

    const nodeStartIndex = +nodes[0].id;
    const positionLength = positionList.current.length;
    let startHeight = positionList.current[nodeStartIndex].dHeight;
    positionList.current[nodeStartIndex].dHeight = 0;

    for (let i = nodeStartIndex + 1; i < positionLength; ++i) {
      const item = positionList.current[i];
      positionList.current[i].top = positionList.current[i - 1].bottom;
      positionList.current[i].bottom =
        positionList.current[i].bottom - startHeight;
      if (item.dHeight !== 0) {
        startHeight += item.dHeight;
        item.dHeight = 0;
      }
    }
    setListHeight(positionList.current[positionLength - 1].bottom);
  };
  useEffect(() => {
    initPositions();
  }, []);
  useEffect(() => {
    setPosition();
  }, [virtualRef.current]);
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
          height: listHeight - startIndex * estimateItemSize,
          transform: `translate3d(0,${startIndex * estimateItemSize}px,0)`,
        }}
        ref={virtualRef}
      >
        {listData.slice(startIndex, startIndex + count).map((item) => {
          const index = listData.findIndex((child) => {
            return child.id === item.id;
          });
          return (
            <Item index={index} key={item.id} itemSize={estimateItemSize}>
              {renderItem(item)}
            </Item>
          );
        })}
      </div>
    </List>
  );
};
export default VirtualList;
