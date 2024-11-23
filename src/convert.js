import readline from 'readline';
import fs from'fs';
import { config } from "../config.mjs";

const outputFileName = `./src/outputData/${config.outputFileName}.jsonl`
const parsedOutputFileName = `./src/outputData/${config.outputFileName}.txt`
let res = [];
let text = ''

function processLine(line) {
  res.push(line)
  return res;
}

const readInterface = readline.createInterface({
    input: fs.createReadStream(outputFileName),
    output: process.stdout,
    console: false
});

readInterface.on('line', processLine);

readInterface.on('close', function() {
    console.log('\n**********************************');
    console.log('**********************************');
    console.log('**********************************');

    res = res
        .map(r => JSON.parse(r).response.body.choices
            .map(z => z.message.content)
        )
        .forEach(t => {
            const parsedT = t[0]
                .replaceAll('\n', ' ')
                // .replace(/[0-9]/g, '')
                // .replaceAll(')', '')
            text += parsedT + '\n'
        })

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