import React from "react";
import { Button } from "ui";
import "./style/rect.less";

export const App = () => {
  return (
    <div className="rect">
      <Button type="primary">主要按钮</Button>
      <Button type="success">成功按钮</Button>
      <Button type="warning">警告按钮</Button>
      <Button type="danger">危险按钮</Button>
      <Button>默认按钮</Button>
      <Button hairline={true} type="primary">
        主要按钮
      </Button>
      <Button hairline={true} type="success">
        成功按钮
      </Button>
      <Button hairline={true} type="warning">
        警告按钮
      </Button>
      <Button hairline={true} type="danger">
        危险按钮
      </Button>
      <Button plain={true} type="primary">
        主要按钮
      </Button>
      <Button plain={true} type="success">
        成功按钮
      </Button>
      <Button plain={true} type="warning">
        警告按钮
      </Button>
      <Button plain={true} type="danger">
        危险按钮
      </Button>
    </div>
  );
};
