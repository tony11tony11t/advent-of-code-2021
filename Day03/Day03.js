const fs = require("fs");

fs.readFile('./Day03/Day03-input.txt' , (err, data) => {
    if (err) throw err;

    const inputs = data.toString().split(/\r?\n/)

    let [gammaRate,epsilonRate] = findGammaRateAndEpsilonRate(inputs)
    let [oxygen,co2] = findOxygenAndCO2(inputs)

    console.log(calculateData(gammaRate,epsilonRate));
    console.log(calculateData(oxygen,co2));

});
//Part 1 
function findGammaRateAndEpsilonRate(diagnosticReport){
    let gammaRate = '';
    let epsilonRate = '';
    for(let i = 0 ; i < diagnosticReport[0].length ; i++){
        let ZeroNum = diagnosticReport.filter(d => d[i] == '0').length
        if(ZeroNum >= diagnosticReport.length / 2){
            gammaRate = gammaRate + '0'
            epsilonRate = epsilonRate + '1'
        }else{
            gammaRate =  gammaRate + '1'
            epsilonRate =  epsilonRate + '0'
        }
    }
    return [gammaRate , epsilonRate]
}

//Part 2
function findOxygenAndCO2(diagnosticReport){
    //find oxygen
    let oxygenRating = diagnosticReport
    let co2Rating = diagnosticReport

    for(let i = 0 ; i < oxygenRating[0].length ; i++){
        let OneNum = oxygenRating.filter(d => d[i] == '1').length
        if(OneNum >= oxygenRating.length / 2){
            oxygenRating = oxygenRating.filter(d => d[i] == '1')
        }else{
            oxygenRating = oxygenRating.filter(d => d[i] == '0')
        }
        if(oxygenRating.length == 1)   break;
    }
    
    //findCo2
    for(let i = 0 ; i < co2Rating[0].length ; i++){
        let ZeroNum = co2Rating.filter(d => d[i] == '0').length
        if(ZeroNum <= co2Rating.length / 2){
            co2Rating = co2Rating.filter(d => d[i] == '0')
        }else{
            co2Rating = co2Rating.filter(d => d[i] == '1')
        }
        if(co2Rating.length == 1)   break;
    }
    return [oxygenRating[0] , co2Rating[0]]
}

function calculateData(data1,data2){
    data1 = parseInt(data1 , 2)
    data2 = parseInt(data2 , 2)
    return data1 * data2
}


