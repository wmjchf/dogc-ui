import React, { useState } from "react";

import {
  Popup,
  Ellipsis,
  Waterfall,
  IWaterItemData,
  VirtualList,
  DragEdit,
  Loading,
  List,
} from "dogc";

import "./style/rect.less";

export const App = () => {
  const [visible, setVisisble] = useState(false);
  const [list, setList] = useState([]);

  const [temp] = useState([
    {
      a: 1,
    },
  ]);
  const [list1, setList1] = useState(
    new Array(50).fill(0).map((item, index) => {
      return { id: index + 1 };
    })
  );
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
      {/* <Ellipsis
        style={{ width: "200px" }}
        content="浮动元素是如何定位的正如我们前面提到的那样，当一个元素浮动之后，它会被移出正常的文档流，然后向左或者向右平移，一直平移直到碰到了所处的容器的边框，或者碰到另外一个浮动的元素。或者碰到另外另外一浮动浮。"
        contentClass="ellipsis-test"
      ></Ellipsis> */}
      {/* <Image
        src="https://t7.baidu.com/it/u=4198287529,2774471735&fm=193&f=GF"
        width={200}
        height={200}
        fit="cover"
        showPlaceholder={true}
        position="left"
      ></Image> */}
      {/* <Waterfall<Data>
        listData={list}
        columns={4}
        width={document.documentElement.clientWidth}
        itemGap={10}
        renderItem={(item) => {
          return (
            <div
              style={{
                width: "100%",
                background: "red",
              }}
            >
              <div>{item.title}</div>
              <div>{item.content}</div>
            </div>
          );
        }}
      ></Waterfall> */}
      {/* <VirtualList
        size={document.documentElement.clientHeight}
        itemSize={100}
        listData={list1}
        renderItem={(item) => {
          return <div style={{ height: 100, width: "100%" }}>{item.id}</div>;
        }}
      ></VirtualList> */}
      {/* <DragEdit>111</DragEdit> */}
      {/* <Loading size={48} loadingWidth={5} noActiveColor="black"></Loading> */}

      <VirtualList
        size={document.documentElement.clientHeight}
        itemSize={100}
        listData={list1}
        renderItem={(item) => {
          return <div style={{ height: 100, width: "100%" }}>{item.id}</div>;
        }}
      ></VirtualList>
    </div>
  );
};
