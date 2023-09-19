import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
    itemSize,
    renderItem,
  } = props;
  const { getPrefixCls } = React.useContext(Context);
  const prefixCls = getPrefixCls("virtual", customPrefixCls);
  const classes = classNames(prefixCls);
  const listClasses = `${prefixCls}--list`;

  const count = useMemo(() => {
    return size / itemSize + 2;
  }, []);

  const listHeight = useMemo(() => {
    return itemSize * listData.length;
  }, [listData]);

  const [startIndex, setStartIndex] = useState(0);

  const listDivRef = useRef<HTMLDivElement>(null);
  const handleScroll = useCallback(function () {
    const scrollTop = listDivRef.current?.scrollTop || 0;
    const startIndex = Math.floor(scrollTop / itemSize);
    setStartIndex(startIndex);
  }, []);
  useEffect(() => {
    listDivRef.current?.addEventListener("scroll", handleScroll);
    listDivRef.current?.addEventListener("touchmove", handleScroll);
  }, []);
  return (
    <div
      className={classNames(classes, className)}
      style={{
        ...style,
        height: size,
      }}
      ref={listDivRef}
    >
      <div
        className={listClasses}
        style={{
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
    </div>
  );
};
export default VirtualList;
