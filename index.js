const fs = require("fs")
const readline = require("readline")
const pinyin = require("pinyin")
const hint = {
    green: [
        {
            char: "u",
            tone: 4,
            place: 1
        },
        {
            char: "i",
            tone: 4,
            place: 2
        },
        {
            char: null,
            tone: 2,
            place: 3
        },
        {
            char: "fei",
            tone: 1,
            place: 4
        }
    ],
    yellow: {
        hanzi: [],
        char: [],
        tone: []
    },
    not: {
        hanzi: ["非", "物", "是", "人"],
        char: ["w","ren"],
        tone: null
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
    const yellowHanzi = hint["yellow"]["hanzi"];
    const yellowChars = hint["yellow"]["char"];
    const yellowTones = hint["yellow"]["tone"];
    const exclusions = hint["not"];
    // 检查排除项
    if (
        exclusions &&
        Object.keys(exclusions).some((key) => exclusions[key] && exclusions[key].length > 0)
    ) {
        let hanziFlag = false, charFlag = false, toneFlag = false;
        // 检测是否出现任何排除汉字
        if (exclusions["hanzi"] && exclusions["hanzi"].length > 0) {
            hanziFlag = exclusions["hanzi"].some((ex) => idiom.indexOf(ex) > -1)
        }
        if (hanziFlag) { return false }
        // 检测是否出现任何排除拼音
        if (exclusions["char"] && exclusions["char"].length > 0) {
            charFlag = exclusions["char"].some((ex) => {
                charSet.some((thisChar) => {thisChar.indexOf(ex) > -1})
            })
        }
        if (charFlag) { return false }
        // 检测是否出现任何排除音调
        if (exclusions["tone"] && exclusions["tone"].length > 0) {
            toneFlag = exclusions["tone"].some((ex) => toneSet.indexOf(ex) > -1)
        }
        if (toneFlag) { return false }
    }
    // 检查绿色条件
    for (let hintChar of greenChars) {
        const thisChar = py[hintChar["place"]-1];
        // 如果指定位置的字不对
        if (hintChar["hanzi"]) {
            if (idiom.split("")[hintChar["place"]-1 != hintChar["hanzi"]]) { return false }
        }
        // 如果指定位置的拼音不对
        if (hintChar["char"]) {
            if (thisChar["char"].indexOf(hintChar["char"]) < 0) { return false }
        }
        // 如果指定位置的音调不对
        if (hintChar["tone"]) {
            if (thisChar["tone"] != hintChar["tone"]) { return false }
        }
    }
    // 检查黄色条件
    // 检查是否有黄色汉字
    if (yellowHanzi && yellowHanzi.length > 0) {
        // 对于每一个黄色汉字，都要在成语中找到它
        let checkYellowHanzi = yellowHanzi.every((hanzi) => idiom.indexOf(hanzi) > -1);
        if (!checkYellowHanzi) { return false };
    }
    // 检查是否有黄色拼音
    if (yellowChars && yellowChars.length > 0) {
        // 对于每一个黄色拼音，至少要在一个字中找到它
        let checkYellowChar = yellowChars.every((char) => {
            charSet.some((el) => el.indexOf(char) > -1);
        });
        if (!checkYellowChar) { return false }
    }
    // 检查是否有黄色音调
    if (yellowTones && yellowTones.length > 0) {
        // 对于每一个音调，至少要出现一次
        let checkYellowTone = yellowTones.every((tone) => toneSet.indexOf(tone) > -1);
        if (!checkYellowTone) { return false }
    }
    return true
}

const r1 = readline.createInterface({
    input: fs.createReadStream("./idioms.txt")
})
r1.on("line", function(line) {
    if(match(line, hint)) {
        console.log(line);
    }
})
r1.on("close", function () {
    console.log("readLine close...")
})



