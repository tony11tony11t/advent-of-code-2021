const fs = require("fs");

fs.readFile('./Day09/Day09-input.txt' , (err, data) => {
    if (err) throw err;

    let inputs = data.toString().split(/\r?\n/)
    inputs = inputs.map(nums => {
        nums = nums.split("").map(n => parseInt(n))
        nums.unshift(10)
        nums.push(10)
        return nums
    })
    inputs.unshift(Array.from({length:inputs[0].length}).fill(10));
    inputs.push(Array.from({length:inputs[0].length}).fill(10));

    //Part 1
    let total = 0;
    for(let i = 1 ; i < inputs.length - 1 ; i++){
        for(let j = 1 ; j < inputs[i].length  - 1; j++){
            if(IsLowPoint(inputs , i , j)){
                total += parseInt(1 + inputs[i][j])
            }
        }
    }
    console.log(total);

    //Part 2
    let tempInput = Array.from(inputs);
    let maxLand = [];
    for(let i = 1 ; i < tempInput.length - 1 ; i++){
        for(let j = 1 ; j < tempInput[i].length  - 1; j++){
            if(tempInput[i][j] != 9){
                maxLand.push(findLand(tempInput , i , j));
            }
        }
    }
    maxLand.sort((a,b) => b - a);
    console.log(maxLand[0] * maxLand[1] * maxLand[2])
});

function IsLowPoint(inputs , y , x){
    let target = inputs[y][x];
    return target < inputs[y - 1][x] &&
           target < inputs[y + 1][x] &&
           target < inputs[y][x - 1] &&
           target < inputs[y][x + 1]
}

function findLand(inputs , y , x){
    let target = inputs[y][x];
    if(target != 9 && target != 10){
        inputs[y][x] = 9
        return 1 + findLand(inputs , y , x + 1) + findLand(inputs , y + 1 , x) + findLand(inputs , y , x - 1) + findLand(inputs , y - 1 , x)
    }else{
        return 0
    }
}
