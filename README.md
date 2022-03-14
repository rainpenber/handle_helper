# handle_helper 汉兜助手
## 介绍
 a handle cheat program 汉兜查答案
 是个丈育，无能狂怒写个汉兜查答案程序，有点违背handle的初衷，所以使用权取决于用户你自己
 写的很烂，但是好像勉强能用
 
## 使用
- 安装依赖
```bash
yarn install
```
npm也可以
## 运行
1. 填入提示（见下方）
2. 
```bash
node ./index.js
```
## 如何填入给出的提示
```javascript
const hint = {
 // 绿色提示 hanzi 汉字 char 拼音 tone音调 没有请写null place是自然阅读位置 1~4
   green: [
        {
            char: "u",
            tone: 4,
            place: 1
        },
        {
            char: null,
            tone: 4,
            place: 1
        },
        {
            hanzi: "徐",
            tone: 4,
            place: 1
        },
    ],
    // 黄色提示 按照数组保存
    yellow: {
        hanzi: [],
        char: [],
        tone: []
    },
    // 灰色提示 按照数组保存
    not: {
        hanzi: ["非", "物", "是", "人"],
        char: ["w","ren"],
        tone: null
    }
}
```
