import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import classNames from "classnames";

import "dogc/es/sort-grid/style/index.css";
interface IInnerData {
  current: number; // 内部记录 origin index
  distanceX: number;
  distanceY: number;
  identifier: number;
  containerLeft: number;
  containerTop: number;
  itemWidth: number;
  itemHeight: number;
  isDragging: boolean;
  previousMove: string;
}
export interface IData {
  id: string | number;
  fixed?: boolean;
}

export interface ISortGrid<T extends IData> {
  data: T[];
  width?: number | string;
  render: (item: T, index: number) => React.ReactNode;
  renderExt?: (style: React.CSSProperties) => React.ReactNode;
  columns: number;
  itemHeight: number;
  itemWidth: number;
  gap?: number;
  onDragEnd?: (data: T[]) => void;
}
const SortGrid = <T extends IData>(props: ISortGrid<T>): React.ReactElement => {
  const {
    data,
    width,
    render,
    columns,
    gap = 0,
    itemHeight,
    onDragEnd,
    renderExt,
    itemWidth,
  } = props;
  const baseDataRef = useRef<IInnerData>({
    current: -1,
    distanceX: 0,
    distanceY: 0,
    identifier: -1,
    itemHeight,
    itemWidth,
    containerLeft: 0,
    containerTop: 0,
    isDragging: false,
    previousMove: "",
  });

  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [selected, setSelected] = useState(-1);
  // const [itemWidth, setItemWidth] = useState(0);
  const [dragData, setDragData] = useState(() => {
    return data.map((item, index) => {
      return {
        ...item,
        sort: index,
      };
    });
  });
  const wrapRef = useRef<HTMLDivElement>(null);
  const getOffsetX = useCallback(
    (index: number) => (itemWidth + gap) * (index % columns),
    [itemWidth, gap, columns]
  );
  const getOffsetY = useCallback(
    (index: number): number => Math.floor(index / columns) * (itemHeight + gap),
    [columns, itemHeight, gap]
  );

  const getIndex = useCallback((x: number, y: number) => x + columns * y, [
    columns,
  ]);
  const row = Math.ceil((data.length + (renderExt ? 1 : 0)) / columns);

  const reset = () => {
    baseDataRef.current.previousMove = "";
    baseDataRef.current.isDragging = false;
    baseDataRef.current.current = -1;
    setSelected(-1);
  };

  // useEffect(() => {
  //   const itemWidth = (wrapRef.current.clientWidth - gap * (columns - 1)) / 3;
  //   setItemWidth(itemWidth);
  //   baseDataRef.current.itemWidth = itemWidth;
  // }, []);

  useEffect(() => {
    setDragData(
      data.map((item, index) => {
        return {
          ...item,
          sort: index,
        };
      })
    );
  }, [data]);

  const sortData = useMemo(() => {
    const positionData = dragData.map((item, index) => {
      return {
        ...item,
        tranX: getOffsetX(item.sort),
        tranY: getOffsetY(item.sort),
      };
    });
    return positionData;
  }, [dragData, getOffsetX, getOffsetY]);

  const sort = (sourceIndex: number, targetIndex: number) => {
    const renderPositon = (list: T[]) => {
      const listData = list.map((item: any) => {
        // item.tranX = `${getOffsetX(item.sort)}`;
        // item.tranY = `${getOffsetY(item.sort)}`;
        return {
          ...item,
          tranX: `${getOffsetX(item.sort)}`,
          tranY: `${getOffsetY(item.sort)}`,
        };
      });
      setDragData(listData);
    };

    const excludeFixed = (sortKey: number, reversed: boolean): number => {
      if (dragData[sortKey].fixed) {
        // fixed 元素位置不会变化, 这里直接用 cKey(sortKey) 获取, 更加快捷
        // eslint-disable-next-line no-param-reassign
        reversed ? --sortKey : ++sortKey;
        return excludeFixed(sortKey, reversed);
      }
      return sortKey;
    };

    // 节流
    const move = `${sourceIndex}-${targetIndex}`;

    if (move === baseDataRef.current.previousMove) return;

    baseDataRef.current.previousMove = move;

    if (sourceIndex < targetIndex) {
      // 正序拖动
      const list = dragData.map((item) => {
        if (item.fixed) return item;
        if (item.sort > sourceIndex && item.sort <= targetIndex) {
          item.sort = excludeFixed(item.sort - 1, true);
        } else if (item.sort === sourceIndex) {
          item.sort = targetIndex;
        }
        return item;
      });
      renderPositon(list);
    } else if (sourceIndex > targetIndex) {
      // 倒序拖动
      const list = dragData.map((item) => {
        if (item.fixed) return item;
        if (item.sort >= targetIndex && item.sort < sourceIndex) {
          item.sort = excludeFixed(item.sort + 1, false);
        } else if (item.sort === sourceIndex) {
          item.sort = targetIndex;
        }
        return item;
      });
      renderPositon(list);
    }
  };

  const onDragStart = (event: any, originIndex: number) => {
    const iTouch = event.touches ? event.touches[0] : event;
    if (!iTouch) return;
    const realIndex = dragData[originIndex].sort;
    // console.log('onLongPress originIndex:', originIndex, '\t realIndex:', realIndex, '\t itemWidth', _baseData.itemWidth);
    // 初始项是固定项则返回
    if (data[originIndex].fixed) return;
    // 如果已经在 drag 中则返回, 防止多指触发 drag 动作, touchstart 事件中有效果
    if (baseDataRef.current.isDragging) return;

    setSelected(realIndex);
    const offsetX = getOffsetX(realIndex);
    const offsetY = getOffsetY(realIndex);

    setTranslateX(columns === 1 ? 0 : offsetX);
    setTranslateY(offsetY);

    baseDataRef.current.distanceX =
      iTouch.pageX - baseDataRef.current.containerLeft - offsetX;
    baseDataRef.current.distanceY =
      iTouch.pageY - baseDataRef.current.containerTop - offsetY;
    baseDataRef.current.identifier = iTouch.identifier;
    baseDataRef.current.current = originIndex;
    baseDataRef.current.isDragging = true;
  };
  const onTouchMove = (event: any) => {
    // event.stopPropagation();
    // event.preventDefault();

    if (!baseDataRef.current.isDragging) return;
    const iTouch = event.touches ? event.touches[0] : event;
    if (!iTouch) return;

    // 如果不是同一个触发点则返回
    if (baseDataRef.current.identifier !== iTouch.identifier) return;

    const tranX =
      columns === 1
        ? 0
        : iTouch.pageX -
          baseDataRef.current.containerLeft -
          baseDataRef.current.distanceX;
    const tranY =
      iTouch.pageY -
      baseDataRef.current.containerTop -
      baseDataRef.current.distanceY;

    setTranslateX(tranX);
    setTranslateY(tranY);

    const currentItem = dragData[baseDataRef.current.current];
    const sourceIndex = currentItem.sort;
    const curX = Math.round(tranX / baseDataRef.current.itemWidth);
    const curY = Math.round(tranY / baseDataRef.current.itemHeight);
    const targetIndex = getIndex(curX, curY);

    // 目标项是固定项则返回
    const targetItem = dragData[targetIndex];
    if (targetItem && targetItem.fixed) return;

    if (targetIndex > -1 && targetIndex < dragData.length) {
      sort(sourceIndex, targetIndex);
    }
  };

  const onTouchEnd = () => {
    reset();
    const hasChanged = dragData.some((v, index) => index !== v.sort);
    if (hasChanged) {
      const tempData = [...dragData];
      tempData.sort((a, b) => a.sort - b.sort);
      onDragEnd && onDragEnd(tempData);
    }
  };
  return (
    <div
      className="sort-grid"
      style={{
        width,
        height: row * itemHeight + (row - 1) * gap,
      }}
      ref={wrapRef}
    >
      {sortData.map((item, index) => {
        return (
          <div
            className={classNames("sort-grid-item", {
              ["sort-grid-item__upper"]: index === selected,
              ["sort-grid-item__transition"]: index !== selected,
            })}
            key={item.id}
            style={{
              width: itemWidth,
              transform:
                index === selected
                  ? `translateX(${translateX}px) translateY(${translateY}px)`
                  : `translate(${item.tranX}px,${item.tranY}px)`,
              height: itemHeight,
            }}
            onTouchStart={(event) => {
              onDragStart(event, index);
            }}
            onTouchMove={(event) => {
              onTouchMove(event);
            }}
            onTouchEnd={onTouchEnd}
            onMouseDown={(event) => {
              onDragStart(event, index);
            }}
            onMouseMove={(event) => {
              onTouchMove(event);
            }}
            onMouseUp={onTouchEnd}
          >
            {render(item, index)}
          </div>
        );
      })}
      {renderExt &&
        renderExt({
          transform: `translate(${getOffsetX(data.length)}px,${getOffsetY(
            data.length
          )}px)`,
          width: itemWidth,
        })}
    </div>
  );
};
export default SortGrid;
