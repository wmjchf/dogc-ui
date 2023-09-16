# 介绍

致力于打造一款常用的 react 移动端组件库！

# 使用

```
import {Button} from "dogc"

<Button>按钮</Button>
```

# 自定义组题

组件库内置一套主题库，然后提供`ConfigProvider`组件自定义主题。

```
import {ConfigProvider} from "dogc"

<ConfigProvider
    theme={{
        primaryColor:"red"
    }}
>
    <Button type="primary">按钮</Button>
</ConfigProvider>
```
