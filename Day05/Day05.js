const fs = require("fs");

fs.readFile('./Day05/Day05-input.txt' , (err, data) => {
    if (err) throw err;

    let inputs = data.toString().split(/\r?\n/)
    console.log(firstPart(inputs));
    console.log(SecondPart(inputs));
});

function firstPart(inputs){
    inputs = inputs.map((d) => {
        return d.split('->').map((pos) => {
            return pos.trim().split(",")
        })
    }).filter((d) => {
        if(d == undefined || d.length != 2)  return false
        return d[0][0] == d[1][0] || d[0][1] == d[1][1]
    })

    let paint = getPaint(inputs)

    for(let i = 0 ; i < inputs.length ; i++){
        
        let [x1 , y1] = [parseInt(inputs[i][0][0]) , parseInt(inputs[i][0][1])]
        let [x2 , y2] = [parseInt(inputs[i][1][0]) , parseInt(inputs[i][1][1])]
        if(x1 == x2){
            if(y1 > y2)
                [y1 , y2] = [y2 , y1]
            for(let j = y1 ; j <= y2 ; j++){
                paint[j][x1] = paint[j][x1] + 1;
            }
            
        }else if(y1 == y2){
            if(x1 > x2)
                [x1 , x2] = [x2 , x1]
            for(let j = x1 ; j <= x2 ; j++){
                paint[y1][j] = paint[y1][j] + 1;
            }
        }
    }
    return calculateScore(paint)
}

function SecondPart(inputs){

    inputs = inputs.map((d) => {
        return d.split('->').map((pos) => {
            return pos.trim().split(",")
        })
    }).filter((d) => {
        if(d == undefined || d.length != 2)  return false
        return d[0][0] == d[1][0] || 
               d[0][1] == d[1][1] || 
               Math.abs(d[0][0] - d[1][0]) == Math.abs(d[0][1] - d[1][1])
    })

    let paint = getPaint(inputs)

    for(let i = 0 ; i < inputs.length ; i++){
        
        let [x1 , y1] = [parseInt(inputs[i][0][0]) , parseInt(inputs[i][0][1])]
        let [x2 , y2] = [parseInt(inputs[i][1][0]) , parseInt(inputs[i][1][1])]
        if(x1 == x2){
            if(y1 > y2)
                [y1 , y2] = [y2 , y1]
            for(let j = y1 ; j <= y2 ; j++){
                paint[j][x1] = paint[j][x1] + 1;
            }
            
        }else if(y1 == y2){
            if(x1 > x2)
                [x1 , x2] = [x2 , x1]
            for(let j = x1 ; j <= x2 ; j++){
                paint[y1][j] = paint[y1][j] + 1;
            }
        }else{
            if(x1 > x2){
                [x1 , x2] = [x2 , x1];
                [y1 , y2] = [y2 , y1];
            }
            for(let j = x1 , k = y1; j <= x2 ; j++ , k += (y1 > y2 ? -1 : 1)){
                paint[k][j] = paint[k][j] + 1;
            }
        }
    }

    return calculateScore(paint)
    
}

function calculateScore(paint){
    let total = 0;
    for(let i = 0 ; i < paint.length ; i++){
        for(let j = 0 ; j < paint[i].length ; j++){
            if(paint[i][j] >= 2){
                total++;
            }
        }
    }
    return total
}

function getPaint(inputs){
    let range = inputs.reduce((arr,cur)=>{
        arr[0] = Math.max(cur[0][0] , cur[1][0] , arr[0])
        arr[1] = Math.max(cur[0][1] , cur[1][1] , arr[1])
        return [arr[0] , arr[1]]
    },[0,0])

    return Array.from({length:range[1] + 1} , () => Array(range[0] + 1).fill(0))
}