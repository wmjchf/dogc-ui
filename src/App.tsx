import React, { useEffect, useState } from "react";

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
import Mock from "mockjs";

import "./style/rect.less";

interface Data extends IWaterItemData {
  title?: string;
  content?: string;
}
export const App = () => {
  const [visible, setVisisble] = useState(false);
  const [list, setList] = useState<Data[]>([
    {
      id: 0,
      imgUrl: "https://t7.baidu.com/it/u=1951645650,1501818406&fm=193&f=GIF",
      imgRatio: 2 / 3,
      title: "家庭聚会",
      content: "给你的爱一直很安静，哈哈哈哈哈，家庭聚会",
    },
    {
      id: 1,
      imgUrl: "https://t7.baidu.com/it/u=1938056713,576237458&fm=193&f=GIF",
      imgRatio: 3 / 2,
      title: "高清美女",
      content:
        "下拉刷新时会触发事件，在事件的回调函数中可以进行同步或异步操作，操作完成后将设置为",
    },
    {
      id: 2,
      imgUrl: "https://t7.baidu.com/it/u=890938330,494135193&fm=193&f=GIF",
      imgRatio: 918 / 1200,
      title: "婴儿图片",
      content:
        "他们的故事从6岁那年开始，那时她还是疯狂如野男孩的丁香，而他也只是默默跟在她背后的慕容北",
    },
    {
      id: 3,
      imgUrl: "https://t7.baidu.com/it/u=890938330,494135193&fm=193&f=GIF",
      imgRatio: 918 / 1200,
      title: "婴儿图片",
      content:
        "他们的故事从6岁那年开始，那时她还是疯狂如野男孩的丁香，而他也只是默默跟在她背后的慕容北",
    },
    {
      id: 4,
      imgUrl: "https://t7.baidu.com/it/u=890938330,494135193&fm=193&f=GIF",
      imgRatio: 918 / 1200,
      title: "婴儿图片",
      content:
        "他们的故事从6岁那年开始，那时她还是疯狂如野男孩的丁香，而他也只是默默跟在她背后的慕容北",
    },
  ]);

  const [temp] = useState([
    {
      a: 1,
    },
  ]);
  const [list1, setList1] = useState([]);
  useEffect(() => {
    setList1(
      new Array(100).fill(0).map((item, index) => {
        return { id: index + 1, content: Mock.mock("@csentence(40, 100)") };
      })
    );
  }, []);
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
      <Waterfall<Data>
        listData={list}
        size={document.documentElement.clientHeight}
        columns={2}
        width={document.documentElement.clientWidth}
        itemGap={10}
        renderItem={(item) => {
          return (
            <div
              style={{
                width: "100%",
              }}
            >
              <div>{item.title}</div>
              <div>{item.content}</div>
            </div>
          );
        }}
      ></Waterfall>
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

      {/* <VirtualList
        size={document.documentElement.clientHeight}
        estimateItemSize={100}
        listData={list1}
        renderItem={(item) => {
          return (
            <div style={{ width: "100%", paddingBottom: 24 }}>
              {item.content}
            </div>
          );
        }}
        onRefresh={() => {
          return new Promise((resolve) => {
            resolve(true);
          });
        }}
      ></VirtualList> */}
    </div>
  );
};
