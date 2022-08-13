import React from "react";
import { ConfigConsumerProps, Context, getPrefixCls } from "./context";
import { IThemeData, setThemeData, ITheme } from "./theme";

export type IConfigProviderProps = {
  children?: React.ReactNode;
  theme?: IThemeData & ITheme;
} & Partial<ConfigConsumerProps>;

const ConfigProvider: React.FC<IConfigProviderProps> = (props) => {
  const { theme = {} } = props;

  setThemeData(theme);

  return (
    <Context.Provider value={{ getPrefixCls, ...props }}>
      {props.children}
    </Context.Provider>
  );
};

export default ConfigProvider;
