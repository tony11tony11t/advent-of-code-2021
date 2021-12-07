const fs = require("fs");

fs.readFile('./Day06/Day06-input.txt' , (err, data) => {
    if (err) throw err;

    let inputs = data.toString().split(/,|\n/)

    inputs = inputs.reduce((arr,cur) => {
        if(cur != ""){
            arr[cur]++
            return arr
        }
        return arr
    } , Array(9).fill(0))

    //part1 answer
    let days = 80;

    //part2 answer
    //let days = 256;
    
    for(let i = 0 ; i < days ; i++){
        afterOneDay(inputs)
    }

    console.log(getAllLanternfishs(inputs))

});

function afterOneDay(lanternfishs){
    let born = lanternfishs.shift();
    lanternfishs.push(born)
    lanternfishs[6] += born;
    return lanternfishs;
}

function getAllLanternfishs(lanternfishs){
    return lanternfishs.reduce((arr,cur) => arr + cur , 0)
}


