import React, {
  useState,
  useRef,
  TouchEventHandler,
  WheelEventHandler,
} from "react";
import classNames from "classnames";
import { ICommonComponentProps } from "../type";
import { Context } from "../config-provider/context";
import Loading from "../loading";
import "dogc/es/list/style/index.css";

export type IListProps = {
  prefixCls?: string;
  containerSize: number;
  willPullTip?: string;
  pullingTip?: string;
  loadingTip?: string;
  loadSuccessTip?: string;
  backgroundColor?: string;
  color?: string;
  fontSize?: number;
  transitionDuration?: number;
  onRefresh?: () => Promise<boolean>;
  onLoad?: () => Promise<boolean>;
  children?: React.ReactNode;
  onTouchStart?: TouchEventHandler<HTMLDivElement>;
  onTouchMove?: TouchEventHandler<HTMLDivElement>;
  onTouchEnd?: TouchEventHandler<HTMLDivElement>;
  onWheel?: WheelEventHandler;
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

const List = (props: IListProps): React.ReactElement => {
  const {
    prefixCls: customPrefixCls,
    className,
    style = {},
    containerSize,
    willPullTip = DefaultConfig.WILL_PULL_TIP,
    pullingTip = DefaultConfig.PULLING_TIP,
    loadingTip = DefaultConfig.LOADING_TIP,
    loadSuccessTip = DefaultConfig.LOAD_SUCCESS_TIP,
    backgroundColor = "#ccc",
    color = "#000",
    fontSize = 12,
    transitionDuration = 0.5,
    onRefresh,
    onLoad,
    children,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onWheel,
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
  const [upLoading, setUpLoading] = useState(false);
  const LOADING_MAP: {
    [key: string]: string;
  } = {
    [LoadStatus.UN_LOADING]: willPullTip,
    [LoadStatus.CAN_LOADING]: pullingTip,
    [LoadStatus.LOADING]: loadingTip,
    [LoadStatus.LOAD_SUCCESS]: loadSuccessTip,
  };

  const minRefreshHiehgt = 60;
  const inertiaScroll = useRef<boolean>(false);
  const contentDivRef = useRef<HTMLDivElement>(null);

  const resetRefresh = () => {
    setHeight(0);
  };

  const handleTouchStart: TouchEventHandler<HTMLDivElement> = (event) => {
    onTouchStart && onTouchStart(event);
    inertiaScroll.current = false;
    setNeedTransition(false);
    setLoadingStatus(LoadStatus.UN_LOADING);
    inertiaScroll.current = false;
    const touch = event.touches[0];
    touchPosition.current.start = touch.clientY;
  };
  const handleTouchMove: TouchEventHandler<HTMLDivElement> = (event) => {
    onTouchMove && onTouchMove(event);
    const scrollTop = event.currentTarget?.scrollTop;
    if (scrollTop > 0) {
      const contentHeight = contentDivRef.current?.clientHeight || 0;

      if (scrollTop + containerSize >= contentHeight && !upLoading) {
        setUpLoading(true);
        if (onLoad) {
          onLoad().then((res) => {
            if (res) {
              setUpLoading(false);
            }
          });
        } else {
          Promise.resolve(true).then(() => {
            // setUpLoading(false);
          });
        }
      }
      return;
    }
    const touch = event.touches[0];
    touchPosition.current.end = touch.clientY;
    const distance = touchPosition.current.end - touchPosition.current.start;
    if (height > minRefreshHiehgt) {
      setLoadingStatus(LoadStatus.CAN_LOADING);
    }
    if (distance < 0) {
      setHeight(height < 0 ? 0 : height + distance);
    } else {
      setHeight(height + distance / 2);
    }
    touchPosition.current.start = touchPosition.current.end;
  };

  const handleScroll: TouchEventHandler<HTMLDivElement> = (event) => {
    if (inertiaScroll.current) {
      onTouchMove && onTouchMove(event);
    }
  };

  const handleWheel: WheelEventHandler = (event) => {
    onWheel && onWheel(event);
    const scrollTop = event.currentTarget?.scrollTop;
    if (scrollTop > 0) {
      const contentHeight = contentDivRef.current?.clientHeight || 0;
      if (scrollTop + containerSize >= contentHeight && !upLoading) {
        setUpLoading(true);
        if (onLoad) {
          onLoad().then((res) => {
            if (res) {
              setUpLoading(false);
            }
          });
        } else {
          Promise.resolve(true).then(() => {
            // setUpLoading(false);
          });
        }
      }
    }
  };

  const handleTouchEnd: TouchEventHandler<HTMLDivElement> = (event) => {
    onTouchEnd && onTouchEnd(event);
    inertiaScroll.current = true;
    touchPosition.current = {
      start: 0,
      end: 0,
    };
    if (loadingStatus === LoadStatus.CAN_LOADING) {
      setLoadingStatus(LoadStatus.LOADING);
    }
    if (onRefresh && loadingStatus === LoadStatus.CAN_LOADING) {
      onRefresh().then((res) => {
        if (res) {
          setLoadingStatus(LoadStatus.LOAD_SUCCESS);
          setNeedTransition(true);
          resetRefresh();
        }
      });
    } else {
      setLoadingStatus(LoadStatus.LOAD_SUCCESS);
      setNeedTransition(true);
      resetRefresh();
    }
  };

  return (
    <div
      className={classNames(classes, className)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
      onScroll={handleScroll}
      style={{
        ...style,
        height: containerSize,
      }}
    >
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
        {loadingStatus === LoadStatus.LOADING && <Loading></Loading>}
        <span className={`${refreshClasses}-tip`}>
          {LOADING_MAP[loadingStatus]}
        </span>
      </div>
      <div className={contentClasses} ref={contentDivRef}>
        {children}
      </div>
      {upLoading && (
        <div className={footerclasses}>
          <Loading></Loading>
          <span className={`${footerclasses}-tip`}>加载中...</span>
        </div>
      )}
    </div>
  );
};

export default List;
