const fs = require("fs")
const readline = require("readline")
const pinyin = require("pinyin")
const hint1 = [
    {
        char: "ing",
        tone: null
    },
    {
        char: "",
        tone: 3
    },
    {
        char: "xin",
        tone: 1
    },
    {
        char: "",
        tone: 1
    }
]
const hint = {
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
    yellow: {
        char: ["ing"],
        tone: [3]
    }
}
const getPinYin = (hanzi) => {
    let res = pinyin(hanzi, {
        heteronym: true,
        style: pinyin.STYLE_TONE2
    });
    let arr = res.map((charArr) => {
        const char = charArr[0];
        return {
            "char": char.slice(0, char.length-1),
            "tone": parseInt(char.slice(char.length-1))
        }
    })
    return arr;
}

const match = (idiom, hint) => {
    let py = getPinYin(idiom);
    let charSet = [], toneSet = [];
    py.map((el)=>{ 
        charSet.push(el.char);
        toneSet.push(el.tone);
    });
    const greenChars = hint["green"];
    const yellowChars = hint["yellow"]["char"];
    const yellowTones = hint["yellow"]["tone"];
    // 检查绿色条件
    for (let hintChar of greenChars) {
        const thisChar = py[hintChar["place"]-1];
        if (hintChar["char"]) {
            if (thisChar["char"] != hintChar["char"]) { return false }
        } else {
            if (thisChar["tone"] != hintChar["tone"]) { return false }
        }
    }
    // 检查黄色条件
    // 检查是否有黄色拼音
    if (yellowChars && yellowChars.length > 0) {
        let count = 0;
        for (let char of yellowChars) {
            for (let el of charSet) {
                if (el.indexOf(char) > -1) {
                    count += 1;
                    break;
                }
            }
        }
        if (count < 1) { return false }
    }
    // 检查是否有黄色音调
    if (yellowTones && yellowTones.length > 0) {
        for (let tone of yellowTones) {
            if (toneSet.indexOf(tone) < 0) { return false }
        }
    }
    return true
}

const r1 = readline.createInterface({
    input: fs.createReadStream("./idioms.txt")
})
// let lineNum = 1;
r1.on("line", function(line) {
    if(match(line, hint)) {
        console.log(line);
    }
})
r1.on("close", function () {
    console.log("readLine close...")
})



