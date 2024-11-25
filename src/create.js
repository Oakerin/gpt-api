import fs from "fs";
import readline from 'readline';
import { config } from "../config.mjs";
import { makeRequests } from './utils/makeRequests.mjs'
import { shuffleArray } from './utils/shuffleArray.mjs'

const gptModel = config.gptModel
const inputFileName = `./src/inputData/${config.inputFileName}.jsonl`;
const requestType = config.requestSetType
const repeatCount = config.requestSetRepeatCount
const systemMessage = {"role": "user", "content": "Please follow the instructions. Write only yes or no depending on the instruction"}
const userMessages = []

const readInterface = readline.createInterface({
    input: fs.createReadStream( `./src/inputData/${config.inputFileName}.txt`),
    output: process.stdout,
    console: false
});

readInterface.on('line', (line) => {
    userMessages.push({"role": "user", "content": line.replaceAll('\\n', '\n')})
});

readInterface.on('close', () => {
    main(userMessages);
});


async function main(userMessages) {
    const shuffledIndexes = []
    let requests = makeRequests(requestType, userMessages, systemMessage, gptModel)
    let text = ''

    for (let i = 0; i < repeatCount; i++) {
        requests
            .map(request => { 
                return { ...request, custom_id: `${i}-${request.custom_id}` }
            })
            // Shuffle for single type
            .map(request => {
                if (requestType === 'SINGLE') {
                    const indexes = []
                    const sysMeassage = request.body.messages[0]
                    let shuffledUserMessage = ''

                    const shuffledUserMessages = shuffleArray([...request.body.messages].slice(1), indexes)
                    shuffledIndexes.push(indexes)

                    shuffledUserMessages.forEach(message => {
                        shuffledUserMessage += message.content + '\n\n'
                    });
    
                    return { 
                        ...request, 
                        body: {
                            ...request.body,
                            messages: [sysMeassage, {"role": "user", "content": shuffledUserMessage}] 
                        }
                    }
                }

                return request
            })
            .forEach(request => {
                text += JSON.stringify(request) + '\n'
            });
    }

    // Create temp file with indexes
    fs.writeFile('./src/inputData/shuffle_temp.json', JSON.stringify({ indexes: shuffledIndexes }), function(error){
        if (error){ 
            return console.log(error);
        }
    })

    fs.writeFile(inputFileName, text, function(error){
        if (error){ 
            return console.log(error);
        }
        
        console.log('\n****************************************');
        console.log('*****************DONE*******************');
        console.log('****************************************');
        console.log(`Input file: ${inputFileName} was created`);
        console.log(`Request set type: ${requestType}`);
        console.log(`Requests set count: ${repeatCount}`);
        console.log(`Chat gpt model: ${gptModel}`);
    })
}
