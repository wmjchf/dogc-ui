import React from "react";

import { createRoot } from "react-dom/client";

import { ConfigProvider } from "ui";

import { App } from "./App";

import "@/style/index.less";

import "@/style/rect.less";

const root = createRoot(document.querySelector("#app"));

root.render(
  <ConfigProvider>
    <App></App>
  </ConfigProvider>
);
