import React, { useEffect, useRef, useState } from "react";

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
import axios from "./request";
import WaterfullData from "./data/waterfull.json";
import "./style/rect.less";

interface Data extends IWaterItemData {
  title?: string;
}
export const App = () => {
  const [visible, setVisisble] = useState(false);
  const sizeRef = useRef<number>(10);
  const pageRef = useRef<number>(1);
  const [list, setList] = useState<Data[]>([]);

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
  const getWaterfullList = function () {
    const result = WaterfullData.slice(
      (pageRef.current - 1) * sizeRef.current,
      pageRef.current * sizeRef.current
    );
    const resultTemp = result.map((item) => {
      return {
        id: item.picture_id,
        title: item.title,
        imgRatio: item.height / item.width,
        imgUrl: item.original_url,
      };
    });

    setList([...list, ...resultTemp]);
  };
  useEffect(() => {
    getWaterfullList();
  }, []);
  // console.log(list, "ere");
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
        onRefresh={() => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(true);
            }, 3000);
          });
        }}
        onLoad={() => {
          return new Promise((resolve) => {
            setTimeout(() => {
              pageRef.current++;
              getWaterfullList();
              resolve(true);
            }, 3000);
          });
        }}
        // renderItem={(item) => {
        //   return (
        //     <div
        //       style={{
        //         width: "100%",
        //       }}
        //     ></div>
        //   );
        // }}
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
