import React from "react";
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
  listData?: T[];
  renderItem: (data: T) => React.ReactElement;
} & ICommonComponentProps;

enum DefaultTip {
  WILL_PULL_TIP = "下拉即可刷新",
  PULLING_TIP = "释放即可刷新",
  LOADING_TIP = "加载中...",
}

const List = <T extends IListItemData>(
  props: IListProps<T>
): React.ReactElement => {
  const {
    prefixCls: customPrefixCls,
    className,
    style = {},
    willPullTip = DefaultTip.WILL_PULL_TIP,
    pullingTip = DefaultTip.PULLING_TIP,
    loadingTip = DefaultTip.LOADING_TIP,
    listData = [],
    renderItem,
  } = props;
  const { getPrefixCls } = React.useContext(Context);
  const prefixCls = getPrefixCls("list", customPrefixCls);
  const classes = classNames(prefixCls);
  const refreshClasses = classNames(`${prefixCls}-refresh`);
  const contentClasses = classNames(`${prefixCls}-content`);
  const footerclasses = classNames(`${prefixCls}-footer`);
  return (
    <div className={classNames(classes, className)}>
      <div className={refreshClasses}>
        <span>{willPullTip}</span>
      </div>
      <div className={contentClasses}>
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
