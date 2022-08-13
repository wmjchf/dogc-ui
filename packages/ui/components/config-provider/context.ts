import React from "react";

export type ConfigConsumerProps = {
  name?: string;
};

export const Context = React.createContext<ConfigConsumerProps>({});
