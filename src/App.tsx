import React, { useState } from "react";
import { Popup, Button } from "ui";
import "./style/rect.less";

export const App = () => {
  const [visible, setVisisble] = useState(false);
  return (
    <div className="rect" id="rect">
      <Popup
        selectorId="rect"
        visible={visible}
        onClose={() => {
          setVisisble(false);
        }}
        position="bottom"
        maskClosable={false}
      >
        <div style={{ height: "200px" }}></div>
      </Popup>
      <Button
        type="primary"
        onClick={() => {
          setVisisble(true);
        }}
        style={{ margin: "10px" }}
      >
        打开Popup
      </Button>
    </div>
  );
};
