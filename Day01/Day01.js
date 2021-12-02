const fs = require("fs");

fs.readFile('./Day01/Day01-input.txt' , (err, data) => {
    if (err) throw err;

    const measurementsStr = data.toString().split(/\r?\n/)
    const measurementsNum = measurementsStr.map(e => parseInt(e))

    console.log(SonarSweep(measurementsNum))
    console.log(SonarSweepNoNoise(measurementsNum))
    
});

//Part 1
function SonarSweep(measurements){
    let increased = 0;

    for(let i = 1 ; i < measurements.length ; i++){
        if(measurements[i - 1] < measurements[i]){
            increased++;
        }
    }
    return increased
}

//Part 2
function SonarSweepNoNoise(measurements){
    let increased = 0;

    for(let i = 3 ; i < measurements.length ; i++){

        if(measurements[i - 3] < measurements[i]){
            increased++;
        }
    }
    return increased
}