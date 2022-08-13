import React from "react";

type IGetPrefixCls = (suffixCls?: string, customPrefixCls?: string) => string;

const defaultPrefixCls = "ui";

export type ConfigConsumerProps = {
  name?: string;
  // 类名前缀
  prefixCls?: string;
  // 获取类型前缀
  getPrefixCls: IGetPrefixCls;
};

export const getPrefixCls: IGetPrefixCls = (
  suffixCls?: string,
  customPrefixCls?: string
) => {
  const { prefixCls = defaultPrefixCls } = React.useContext(Context);
  return `${customPrefixCls || prefixCls}-${suffixCls}`;
};

export const Context = React.createContext<ConfigConsumerProps>({
  prefixCls: defaultPrefixCls,
  getPrefixCls,
});
