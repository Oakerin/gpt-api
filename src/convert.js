import readline from 'readline';
import fs from 'fs';
import { config } from "../config.mjs";
import shuffleData from './inputData/shuffle_temp.json' with { type: 'json' }; 
import { convertOutputData } from './utils/convertOutputData.mjs';

const inputFileName = `./src/inputData/${config.inputFileName}.txt`
const outputFileName = `./src/outputData/${config.outputFileName}.jsonl`
const parsedOutputFileName = `./src/outputData/${config.outputFileName}.txt`
const regexp = /yes|no/gi

let input = []
let res = [];
let text = ''


const readInputInterface = readline.createInterface({
    input: fs.createReadStream(inputFileName),
    output: process.stdout,
    console: false
});

readInputInterface.on('line', (line) => {
    input.push(line)
    return input;
});

readInputInterface.on('close', () => {
    convert(input.length)   
})


function convert(inputLinesCount) {
    const readInterface = readline.createInterface({
        input: fs.createReadStream(outputFileName),
        output: process.stdout,
        console: false
    });
    
    readInterface.on('line', (line) => {
        res.push(line)
        return res;
    });
    
    readInterface.on('close', function() {
        console.log('\n**********************************');
        console.log('*************PARSING...*************');
        console.log('************************************');
    
        if (config.requestSetType === 'SINGLE') {
            res
            .map(r => JSON.parse(r).response.body.choices
                .map(z => z.message.content)
            )
            .forEach((t, i) => {
                // 1 step: [ 'No\n\nNo\n\nYes\n\nYes' ] => ['No', 'No', 'Yes', 'Yes']
                // 2 step: ['No', 'No', 'Yes', 'Yes'] => Shuffle to default order ['Yes', 'Yes', 'No', 'No']
                // 3 step: ['Yes', 'Yes', 'No', 'No'] => 'Yes Yes No No'
    
                // 1 step 
                // console.log('\n****************************************');
                // console.log('*****************1 STEP*****************');
                // console.log('****************************************');
                let gptAnswer = t[0]
                let shuffledAnswers = [...gptAnswer.matchAll(regexp)]
                    .map(item => item[0])
    
                // console.log(shuffledAnswers)
    
                // 2 step
                // console.log('****************************************');
                // console.log('*****************2 STEP*****************');
                // console.log('****************************************');
                let answers = shuffledAnswers
                
                answers = []
                let indexes = shuffleData.indexes[i]
    
                indexes.forEach((index, j) => {
                    answers[index] = shuffledAnswers[j]
                })
    
                // console.log(answers)
    
                // 3 step 
                // console.log('****************************************');
                // console.log('*****************3 STEP*****************');
                // console.log('****************************************');
                text += answers.join(' ') + '\n'
    
                // console.log(text);
    
            })
        } else {
            // MULTIPLE case for now
            text = convertOutputData(res, inputLinesCount)
        }
    
        console.log(text);
    
        fs.writeFile(parsedOutputFileName, text, function(error){
            if (error){ 
                return console.log(error);
            }
            console.log('****************************************');
            console.log('*****************DONE*******************');
            console.log('****************************************');
        }) 
    });   
}