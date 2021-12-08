const fs = require("fs");

fs.readFile('./Day07/Day07-input.txt' , (err, data) => {
    if (err) throw err;

    let inputs = data.toString().split(/,|\n/)
    inputs = inputs.reduce((obj , cur) => {
        if(obj[cur] != undefined)
            obj[cur]++
        else    
            obj[cur] = 1;
        return obj
    },[])

    //part1
    let centerKey = findCenterKey(inputs);
    console.log(calculateFuel1(inputs , centerKey));

    //part2
    let centerNum = findCenterNum(inputs);
    console.log(calculateFuel2(inputs , centerNum));
    

});

function findCenterKey(inputs){
    let total = inputs.reduce((arr,cur) => cur ? arr + cur : arr)
    let centerIndex = parseInt(total / 2);
    let nowIndex = -1;
    while(centerIndex > 0){
        do{
            nowIndex++;
        }while(!inputs[nowIndex])

        centerIndex -= inputs[nowIndex];
    }
    return nowIndex;
}

function calculateFuel1(inputs , centerIndex){
    return inputs.reduce((arr , cur , i) => {
        if(cur) 
            arr += Math.abs(centerIndex - i) * cur
        return arr;
    } , 0)
}

function findCenterNum(inputs){
    let length = inputs.reduce((arr,cur) => cur ? arr + cur : arr)
    let total = inputs.reduce((arr,cur , i) => cur ? arr + (cur * i) : arr)
    let centerNum = parseInt(total / length);
    return centerNum;
}

function calculateFuel2(inputs , centerNum){
    let ans = 0;
    let total = 0;

    for(let i = 1; i <= centerNum ; i++){
        total += i;
        if(inputs[centerNum - i]){
            ans += total * inputs[centerNum - i]
        }
    }

    total = 0;
    for(let i = centerNum + 1; i < inputs.length ; i++){
        total += (i - centerNum);
        if(inputs[i]){
            ans += total * inputs[i]
        }
    }

    return ans
}