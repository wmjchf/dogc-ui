import React, { useState } from "react";

import { Popup, Button, Image, Ellipsis } from "ui";

import "./style/rect.less";

export const App = () => {
  const [visible, setVisisble] = useState(false);
  return (
    <div className="rect" id="rect">
      {/* <Popup
        selectorId="rect"
        visible={visible}
        onClose={() => {
          setVisisble(false);
        }}
        position="bottom"
        maskClosable={true}
      >
        <div
          style={{
            height: "200px",
            borderRadius: "10px 10px 0 0",
            background: "#fff",
          }}
        ></div>
      </Popup> */}
      {/* <Button
        type="default"
        onClick={() => {
          setVisisble(true);
        }}
      >
        打开Popup
      </Button> */}
      <Ellipsis style={{ width: "300px" }}></Ellipsis>
      {/* <Image
        src="https://t7.baidu.com/it/u=4198287529,2774471735&fm=193&f=GF"
        width={200}
        height={200}
        fit="cover"
        showPlaceholder={true}
        position="left"
      ></Image> */}
    </div>
  );
};
