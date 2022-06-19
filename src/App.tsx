import { Button } from "ui";
import React from "react";

export const App = () => {
  const execute = () => {
    import(/*webpackChunkName:'test'*/ "./utils/index").then(
      ({ formatDogWang }) => {
        formatDogWang();
      }
    );
  };
  return (
    <div className="rect" onClick={execute}>
      <Button text="按钮"></Button>
    </div>
  );
};
