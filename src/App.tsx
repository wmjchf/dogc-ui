import React, { useState } from "react";

import {
  Popup,
  Button,
  Image,
  Ellipsis,
  Waterfall,
  IWaterItemData,
  VirtualList,
  Drag,
} from "dogc";

import "./style/rect.less";
interface Data extends IWaterItemData {
  title?: string;
  content?: string;
  url?: string;
}
export const App = () => {
  const [visible, setVisisble] = useState(false);
  const [list, setList] = useState([
    {
      id: 0,
      title: "我是你爸爸",
      content: "爸爸",
    },
    {
      id: 1,
      title: "我是你爷爷",
      content: "爷爷爷爷爷爷爷爷爷爷爷爷",
    },
    {
      id: 2,
      title: "我是你奶奶",
      content: "奶奶奶奶奶奶奶奶奶奶奶奶奶奶奶奶奶奶奶奶奶奶奶奶奶奶奶奶",
    },
    {
      id: 3,
      title: "我是你妈妈",
      content: "妈妈妈妈妈妈妈妈妈妈妈妈",
    },
    {
      id: 4,
      title: "我是你舅舅",
      content:
        "舅舅舅舅舅舅舅舅舅舅舅舅舅舅舅舅舅舅舅舅舅舅舅舅舅舅舅舅舅舅舅舅舅舅舅舅",
    },
    {
      id: 5,
      title: "我是你哥哥",
      content: "哥哥哥哥哥哥哥哥哥哥哥哥哥哥",
    },
    {
      id: 6,
      title: "我是你二爷",
      content:
        "二爷二爷二爷二爷二爷二爷二爷二爷二爷二爷二爷二爷二爷二爷二爷二爷二爷二爷二爷二爷二爷二爷二爷",
    },
    {
      id: 7,
      title: "我是你大爷",
      content: "大爷大爷大爷大爷大爷大爷大爷大爷大爷大爷大爷大爷",
    },
    {
      id: 8,
      title: "我是你三爷",
      content: "三爷三爷三爷三爷三爷三爷三爷三爷",
    },
    {
      id: 9,
      title: "我是你四爷",
      content: "四爷四爷四爷四爷四爷四爷四爷四爷四爷四爷四爷四爷四爷四爷四爷",
    },
  ]);
  const [temp] = useState([
    {
      a: 1,
    },
  ]);
  const [list1] = useState(
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
      <Drag>111</Drag>
    </div>
  );
};
