const fs = require("fs");

fs.readFile('./Day08/Day08-input.txt' , (err, data) => {
    if (err) throw err;

    let inputs = data.toString().split(/\r?\n/)
    
    let inputsPart1 = inputs.map(str => str.split("|")[1].trim().split(" "));
    console.log(findDigit_1_4_7_8(inputsPart1))


    let inputsPart2 = inputs.map(str => str.split("|"));
    inputsPart2 = inputsPart2.map(pattern => 
        [pattern[0].trim().split(" ") , pattern[1].trim().split(" ")]
    )
    
    let total = 0;
    for(let i = 0 ; i < inputsPart2.length ; i++){
        let DigitList = GenerateDigitList(inputsPart2[i][0]);
        let ans = "";
        for(let j = 0 ; j < inputsPart2[i][1].length ; j++){
            ans += findDigit(DigitList , inputsPart2[i][1][j]) 
        }
        total += parseInt(ans);
    }
    console.log(total)

});

function findDigit_1_4_7_8(inputs){
    let ans = 0;
    for(let i = 0 ; i < inputs.length ; i++){
        for(let j = 0 ; j < inputs[i].length ; j++){
            ans += [2,3,4,7].some(x => x ==inputs[i][j].length)
        }
    }
    return ans;
}

function GenerateDigitList(pattern){
    //pre-process letter in rach pattern
    pattern.sort((a,b) => a.length - b.length);
    pattern = pattern.map(p => p.split("").sort())

    const DigitList = {
        1 : pattern[0],
        4 : pattern[2],
        7 : pattern[1],
        8 : pattern[9],
    }

    let tempLength5Pattern = [pattern[3],pattern[4],pattern[5]]
    let tempLength6Pattern = [pattern[6],pattern[7],pattern[8]]

    //find 3 (length == 5 and have 1's all letters)
    for(let i = 0 ; i <= 2 ; i++){
        if(DigitList[1].filter(c => tempLength5Pattern[i].includes(c)).length == 2){
            DigitList[3] = tempLength5Pattern[i];
            tempLength5Pattern.splice(i , 1)
            break;
        }
    }

    //find 6 (length == 6 and doesn't have 1's all letters)
    for(let i = 0 ; i <= 2 ; i++){
        if(DigitList[1].filter(c => tempLength6Pattern[i].includes(c)).length == 1){
            DigitList[6] = tempLength6Pattern[i];
            tempLength6Pattern.splice(i , 1);
            break;
        }
    }

    //find rightTopDigit
    let rightTopDigit = '';
    let allLetter = ['a' , 'b' , 'c' , 'd' , 'e' , 'f' , 'g']
    for(let i = 0 ; i < allLetter.length ; i++){
        if(allLetter[i] != DigitList[6][i]){
            rightTopDigit = allLetter[i];
            break;
        }
    }

    //find 2 and 5
    for(let i = 0 ; i <= 1 ; i++){
        if(tempLength5Pattern[i].includes(rightTopDigit)){
            DigitList[2] = tempLength5Pattern[i];
            tempLength5Pattern.splice(i , 1);
            DigitList[5] = tempLength5Pattern[0];
            break;
        }
    }

    //find 9 and 0
    for(let i = 0 ; i <= 1 ; i++){
        if(DigitList[3].filter(c => tempLength6Pattern[i].includes(c)).length == 5){
            DigitList[9] = tempLength6Pattern[i];
            tempLength6Pattern.splice(i , 1);
            DigitList[0] = tempLength6Pattern[0];
            break;
        }
    }
    return DigitList

}

function findDigit(DigitList , digits){

    
    let length = digits.length;
    if(length == 2) return '1'
    if(length == 3) return '7'
    if(length == 4) return '4'
    if(length == 7) return '8'

    let digitsStr = digits.split("").sort().join("");

    if(length == 5){
        if (digitsStr == DigitList[2].join("")) return '2'
        if (digitsStr == DigitList[3].join("")) return '3'
        if (digitsStr == DigitList[5].join("")) return '5'
    }

    if(length == 6){
        if (digitsStr == DigitList[0].join("")) return '0'
        if (digitsStr == DigitList[6].join("")) return '6'
        if (digitsStr == DigitList[9].join("")) return '9'
    }
}
