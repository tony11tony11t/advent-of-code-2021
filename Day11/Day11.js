const fs = require("fs");

fs.readFile('./Day11/Day11-input.txt' , (err, data) => {
    if (err) throw err;

    let inputs = data.toString().split(/\r?\n/)

    inputs = inputs.map(octopuses => octopuses.split("").map(octopus => parseInt(octopus)));
    let total = 0;
    let part1Input = inputs;
    for(let i = 0 ; i < 100 ; i++){
        part1Input = forwardOneStep(part1Input);
        let thisStepScore = calculateScoreAndReset(part1Input)
        total += thisStepScore;
    }
    console.log(total);

    let part2Input = inputs;
    for(let i = 0 ; i < 1000 ; i++){
        part2Input = forwardOneStep(part2Input);
        let thisStepScore = calculateScoreAndReset(part2Input)
        if(thisStepScore == (part2Input.length  * part2Input[0].length)){
            console.log("Get it! The step ：" , i + 1)
            break;
        }
    }

});

function forwardOneStep(inputs){
    //All plus 1
    inputs = inputs.map(octopuses => octopuses.map(octopus => octopus + 1))
    let changeOctopus = false
    do{
        //init
        changeOctopus = false

        //checkOctopus
        for(let i = 0 ; i < inputs.length ; i++){
            for(let j = 0 ; j < inputs[i].length ; j++){
                if(inputs[i][j] > 9){
                    if(IsVaild(inputs , i - 1 , j - 1)) inputs[i - 1][j - 1]++
                    if(IsVaild(inputs , i - 1 , j))     inputs[i - 1][j]++
                    if(IsVaild(inputs , i - 1 , j + 1)) inputs[i - 1][j + 1]++
                    if(IsVaild(inputs , i , j - 1))     inputs[i][j - 1]++
                    if(IsVaild(inputs , i , j + 1))     inputs[i][j + 1]++
                    if(IsVaild(inputs , i + 1 , j - 1)) inputs[i + 1][j - 1]++
                    if(IsVaild(inputs , i + 1 , j))     inputs[i + 1][j]++
                    if(IsVaild(inputs , i + 1 , j + 1)) inputs[i + 1][j + 1]++
                    inputs[i][j] = "*"
                    changeOctopus = true
                }
            }
        }
    }while(changeOctopus)

    return inputs;
}

function IsVaild(inputs , y , x){
    if(inputs[y]){
        if(inputs[y][x] && inputs[y][x] != "*"){
            return true;
        }
    }
    return false;
}

function calculateScoreAndReset(inputs){
    let total = 0;
    for(let i = 0 ; i < inputs.length ; i++){
        for(let j = 0 ; j < inputs[i].length ; j++){
            if(inputs[i][j] == "*"){
                total++;
                inputs[i][j] = 0;
            }
        }
    }
    return total;
}