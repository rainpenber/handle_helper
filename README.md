# handle_helper 汉兜助手
 a handle cheat program 汉兜查答案
 是个丈育，无能狂怒写个汉兜查答案程序，有点违背handle的初衷，所以使用权取决于用户你自己
 写的很烂，但是好像勉强能用
 
 **还没有实现**
 
```javascript
const hint = {
 // 绿色提示 char 提示的拼音 没有请写""或者null tone是音调 没有请写null place是自然阅读位置 1~4
    green: [
        {
            char: "xin",
            tone: 1,
            place: 3
        },
        {
            char: null,
            tone: 1,
            place: 4
        }
    ],
    // 黄色提示 以array保存
    yellow: {
        char: ["ing"],
        tone: [3]
    }
}
```
