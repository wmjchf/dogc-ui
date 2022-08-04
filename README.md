# 安装、打包、运行

## 安装所有依赖

```
yarn install
```

## 打包组件库

```
yarn run build
```

## 运行 example，预览组件效果

```
yarn run build:dev
```

## 给对应 packages 添加依赖

```
yarn workspace package名字 add 依赖包名
```

## 给根目录添加依赖

```
yarn add 依赖包名 -W
```

# 主要目录说明

- **src**: react 项目(example)，用来预览组件。
- **package/ui**: 组件源码。
- **package/site**: 组件库文档。
- **package/ui-theme-default**: 默认主题库，方便以后自定义主题包。
