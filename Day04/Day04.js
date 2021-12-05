const fs = require("fs");

fs.readFile('./Day04/Day04-input.txt' , (err, data) => {
    if (err) throw err;

    const inputs = data.toString().split(/\r?\n\r?\n/)

    //preprocess data
    const chosenNums = inputs[0].split(",")
    
    let boards = new Array(inputs.length - 1);
    for(let i = 1 ; i < inputs.length ; i++){
        boards[i - 1] = new board();
        boards[i - 1].putData(inputs[i]);
    }
    
    //part 1
    let firstBingo = false
    for(let i = 0 ; i < chosenNums.length && !firstBingo; i++){
        for(let j = 0 ; j < boards.length; j++){
            boards[j].marked(chosenNums[i])
            
            if(boards[j].bingo()){
                console.log(boards[j].calculateScore(chosenNums[i]))
                firstBingo = true;
                break;
            }
        }
    }

    //part2
    for(let i = 1 ; i < inputs.length ; i++){
        boards[i - 1].init();
        boards[i - 1].putData(inputs[i]);
    }

    let totalBoard = boards.length;
    for(let i = 0 ; i < chosenNums.length && totalBoard > 0; i++){
        for(let j = 0 ; j < boards.length ; j++){

            if(!boards[j].win){
                boards[j].marked(chosenNums[i])

                if(boards[j].bingo()){
                    totalBoard--
                }
    
                if(totalBoard == 0){
                    console.log(boards[j].calculateScore(chosenNums[i]))
                    break;
                }
            }
        }
    }
});

function board(){

    this.win = false;

    this.init = () => {
        this.win = false;
        this.data = Array.from({length:5});
    }

    this.putData = (d) => {
        this.data = d.split(/\r?\n/).reduce((arr , cur , j) => {
            arr[j] = cur.trim().split(/ +/);
            return arr;
        },Array.from({length:5}))
    }

    this.marked = (markedNum) => {
        for(let i = 0 ; i < this.data.length ; i++){
            for(let j = 0 ; j < this.data[i].length ; j++){
                if(this.data[i][j] == markedNum)
                    this.data[i][j] = "*"
            }
        }
    }

    this.bingo = () => {
        this.check = (i = 0 , j = 0 , type) => {
            if(i >= this.data.length || j >= this.data[i].length)
                return true

            if(this.data[i][j] == "*"){
                if(type == "row")
                    return this.check(i, j + 1 , "row")
                else if(type == "column")
                    return this.check(i + 1, j , "column")
            }else
                return false
        }

        for(let i = 0 ; i < this.data.length ; i++){
            if(this.check(i , 0 , "row")){
                this.win = true
                return true
            }
                
        }

        for(let i = 0 ; i < this.data[0].length ; i++){
            if(this.check(0 , i , "column")){
                this.win = true
                return true
            }
        }
        
        return false
    } 

    this.calculateScore = (markedNum = 1) => {
        let total = 0;
        for(let i = 0 ; i < this.data.length ; i++){
            for(let j = 0 ; j < this.data[i].length ; j++){
                if(this.data[i][j] != "*"){
                    total += parseInt(this.data[i][j])
                }
            }
        }
        return total * markedNum
    }
}





