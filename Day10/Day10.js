const fs = require("fs");

fs.readFile('./Day10/Day10-input.txt' , (err, data) => {
    if (err) throw err;

    let inputs = data.toString().split(/\r?\n/)

    //Part1
    let total = inputs.reduce((arr , cur) => arr + getScore1(cur) , 0)
    console.log(total)

    //Part2
    let totalList = inputs.map((line) => getScore2(line)).filter(total => total != 0);
    totalList.sort((a,b) => a - b)
    console.log(totalList[parseInt(totalList.length / 2)]);

});

function getScore1(line){
    let tempStack = [];
    const LeftSign = {
        '(':")",
        '[':"]",
        '{':"}",
        '<':">"
    };
    for(let i = 0 ; i < line.length ; i++){
        if(Object.keys(LeftSign).some(s => line[i] == s)){
            tempStack.push(line[i]);
        }else{
            if(LeftSign[tempStack[tempStack.length - 1]] == line[i]){
                tempStack.pop();
            }else{
                if(line[i] == ")") return 3
                if(line[i] == "]") return 57
                if(line[i] == "}") return 1197
                if(line[i] == ">") return 25137
            }
        }
    }
    return 0;
}

function getScore2(line){
    let tempStack = [];
    const LeftSign = {
        '(':")",
        '[':"]",
        '{':"}",
        '<':">"
    };
    let completeSign = [];
    for(let i = 0 ; i < line.length ; i++){
        if(Object.keys(LeftSign).some(s => line[i] == s)){
            tempStack.push(line[i]);
        }else{
            if(LeftSign[tempStack[tempStack.length - 1]] != line[i]){
                return 0
            }
            tempStack.pop();
        }
    }
    
    while(tempStack.length > 0){
        completeSign.push(LeftSign[tempStack.pop()])
    }
    
    return completeSign.reduce((arr,cur) => {
        if(cur == ")")
            return arr * 5 + 1
        if(cur == "]")
            return arr * 5 + 2
        if(cur == "}")
            return arr * 5 + 3
        if(cur == ">")
            return arr * 5 + 4
    } , 0)
}