const fs = require("fs");

fs.readFile('./Day02/Day02-input.txt' , (err, data) => {
    if (err) throw err;

    const inputs = data.toString().split(/\r?\n/)

    console.log(Dive(inputs))
    console.log(Dive2(inputs))
});

//Part1
function Dive(inputs){

    let total = inputs.reduce((arr , input) => {
        let action , num;
        [action , num] = input.split(" ")
        num = parseInt(num);

        if(action == 'forward'){
            return [arr[0] + num , arr[1]] 
        }else if(action == "down"){
            return [arr[0] , arr[1] + num] 
        }else if(action == "up"){
            return [arr[0] , arr[1] - num] 
        }else return arr
    },[0,0]);

    return total[0] * total[1]
}


//Part2
function Dive2(inputs){

    let total = inputs.reduce((arr , input) => {
        let action , num;
        [action , num] = input.split(" ")
        num = parseInt(num);

        if(action == 'forward'){
            return [arr[0] + num , arr[1] , arr[2] + arr[1] * num]
        }else if(action == "down"){
            return [arr[0] , arr[1] + num , arr[2]] 
        }else if(action == "up"){
            return [arr[0] , arr[1] - num , arr[2]] 
        }else return arr
    },[0,0,0]);

    return total[0] * total[2]
}

