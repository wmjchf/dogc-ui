import React, { useState, useRef, TouchEventHandler, useMemo } from "react";
import classNames from "classnames";
import { ICommonComponentProps } from "../type";
import { Context } from "../config-provider/context";
import { Item, IListItemData } from "./item";
import "dogc/es/list/style/index.css";

export type IListProps<T extends IListItemData> = {
  prefixCls?: string;
  willPullTip?: string;
  pullingTip?: string;
  loadingTip?: string;
  loadSuccessTip?: string;
  backgroundColor?: string;
  color?: string;
  fontSize?: number;
  transitionDuration?: number;
  listData?: T[];
  renderItem: (data: T) => React.ReactElement;
} & ICommonComponentProps;

enum DefaultConfig {
  WILL_PULL_TIP = "下拉即可刷新",
  PULLING_TIP = "释放即可刷新",
  LOADING_TIP = "加载中...",
  LOAD_SUCCESS_TIP = "刷新成功",
}
enum LoadStatus {
  UN_LOADING = "un_loaidng",
  CAN_LOADING = "can_loading",
  LOADING = "loading",
  LOAD_SUCCESS = "load_success",
  NONE = "none",
}

interface ITouchPosition {
  start: number;
  end: number;
}

const List = <T extends IListItemData>(
  props: IListProps<T>
): React.ReactElement => {
  const {
    prefixCls: customPrefixCls,
    className,
    style = {},
    willPullTip = DefaultConfig.WILL_PULL_TIP,
    pullingTip = DefaultConfig.PULLING_TIP,
    loadingTip = DefaultConfig.LOADING_TIP,
    loadSuccessTip = DefaultConfig.LOAD_SUCCESS_TIP,
    backgroundColor = "#ccc",
    color = "#000",
    fontSize = 12,
    transitionDuration = 0.5,
    listData = [],
    renderItem,
  } = props;
  const { getPrefixCls } = React.useContext(Context);
  const prefixCls = getPrefixCls("list", customPrefixCls);
  const classes = classNames(prefixCls);
  const refreshClasses = classNames(`${prefixCls}-refresh`);
  const contentClasses = classNames(`${prefixCls}-content`);
  const footerclasses = classNames(`${prefixCls}-footer`);
  const [height, setHeight] = useState(0);
  const [needTransition, setNeedTransition] = useState(false);
  const touchPosition = useRef<ITouchPosition>({ start: 0, end: 0 });
  const [loadingStatus, setLoadingStatus] = useState<LoadStatus>(
    LoadStatus.NONE
  );
  const LOADING_MAP: {
    [key: string]: string;
  } = {
    [LoadStatus.UN_LOADING]: willPullTip,
    [LoadStatus.CAN_LOADING]: pullingTip,
    [LoadStatus.LOADING]: loadingTip,
    [LoadStatus.LOAD_SUCCESS]: loadSuccessTip,
  };
  const minRefreshHiehgt = 60;
  const resetRefresh = () => {
    setHeight(0);
    touchPosition.current = {
      start: 0,
      end: 0,
    };
  };
  const handleTouchStart: TouchEventHandler<HTMLDivElement> = (event) => {
    setNeedTransition(false);
    setLoadingStatus(LoadStatus.UN_LOADING);
    const touch = event.touches[0];
    touchPosition.current.start = touch.clientY;
  };
  const handleTouchMove: TouchEventHandler<HTMLDivElement> = (event) => {
    const touch = event.touches[0];
    touchPosition.current.end = touch.clientY;
    const distance = touchPosition.current.end - touchPosition.current.start;
    if (height > minRefreshHiehgt) {
      setLoadingStatus(LoadStatus.CAN_LOADING);
    }
    if (distance > 0) {
      setHeight(height + distance);
    } else {
      setHeight(height + distance / 2);
    }
    touchPosition.current.start = touchPosition.current.end;
  };

  const handleTouchEnd: TouchEventHandler<HTMLDivElement> = (event) => {
    setLoadingStatus(LoadStatus.LOADING);
    setTimeout(() => {
      setLoadingStatus(LoadStatus.LOAD_SUCCESS);
      setNeedTransition(true);
      resetRefresh();
    }, 2000);
  };
  return (
    <div className={classNames(classes, className)}>
      <div
        className={refreshClasses}
        style={{
          height,
          backgroundColor,
          color,
          fontSize,
          transition: needTransition ? `height ${transitionDuration}s` : "none",
        }}
      >
        <span>{LOADING_MAP[loadingStatus]}</span>
      </div>
      <div
        className={contentClasses}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {listData.map((item) => {
          return (
            <Item key={item.id} data={item}>
              {renderItem(item)}
            </Item>
          );
        })}
      </div>
    </div>
  );
};

export default List;
