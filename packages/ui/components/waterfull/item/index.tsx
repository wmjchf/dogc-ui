import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { ICommonComponentProps } from "../../type";

import { Context } from "../../config-provider/context";
import "dogc/es/waterfull/item/style/index.css";
export interface IWaterItemPosition {
  top: number;
  index: number;
}
export interface IWaterItemData {
  imgRatio?: number;
  imgUrl?: string;
  id: string | number;
  extraHeight?: number;
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
  const prefixCls = getPrefixCls("waterfull-item", customPrefixCls);
  const classes = classNames(prefixCls);
  const imageClasses = `${prefixCls}__image`;
  const extraClasses = `${prefixCls}__extra`;
  const divRef = useRef<HTMLDivElement>(null);
  const [positionInfo, setPositionInfo] = useState<IWaterItemPosition>();

  useEffect(() => {
    const positionInfo = getWaterfallItemPostionInfo({
      ...node,
      extraHeight: divRef.current?.offsetHeight,
    });
    setPositionInfo(positionInfo);
  }, []);

  return (
    <div
      className={classNames(classes)}
      style={{
        position: "absolute",
        top: positionInfo?.top,
        left: (positionInfo?.index || 0) * (width + itemGap),
        width,
      }}
    >
      {node.imgUrl && (
        <div
          className={classNames(imageClasses)}
          style={{
            height: (node.imgRatio || 0) * width,
          }}
        >
          <img src={node.imgUrl} alt="" />
        </div>
      )}
      {children && (
        <div ref={divRef} className={extraClasses}>
          {children}
        </div>
      )}
    </div>
  );
};

export { Item };
