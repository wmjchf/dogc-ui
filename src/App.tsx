import React from "react";
import { Popup } from "ui";
import "./style/rect.less";

export const App = () => {
  return (
    <div className="rect" id="rect">
      <Popup selectorId="rect"></Popup>
    </div>
  );
};
