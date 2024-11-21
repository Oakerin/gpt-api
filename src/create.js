import fs from "fs";
import readline from 'readline';
import { config } from "../config.mjs";

const inputFileName = `./src/inputData/${config.inputFileName}.jsonl`;
const requestType = config.requestSetType
const repeatCount = config.requestSetRepeatCount
const systemMessage = {"role": "system", "content": "In the following, we will present you 12 syllogism puzzles that have 2 premises and a conclusion (the sentence after 'Therefore'). Your task will be to judge whether the conclusion NECESSARLY from its two premises."}
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
    let text = ''
    let requests

    if (requestType === 'MULTIPLE') {
        requests = userMessages
            .map(userMessage => {
                return [systemMessage, userMessage]
            })
            .map((messages, i) => {
                return {"custom_id": `${i}`, "method": "POST", "url": "/v1/chat/completions", "body": {"model": config.gptModel, "messages": messages, "max_tokens": 100}}
            })
    } else {
        requests = [{"custom_id": '1', "method": "POST", "url": "/v1/chat/completions", "body": {"model": config.gptModel, "messages": userMessages, "max_tokens": 100}}]
    }

    for (let i = 0; i < repeatCount; i++) {
        requests
            .map(request => { 
                return { ...request, custom_id: `${i}-${request.custom_id}` }
            })
            .forEach(request => {
                text += JSON.stringify(request) + '\n'
            });
    }

    fs.writeFile(inputFileName, text, function(error){
        if (error){ 
            return console.log(error);
        }
        
        console.log('\n****************************************');
        console.log('*****************DONE*******************');
        console.log('****************************************');
        console.log(`Input file: ${inputFileName} was created`);
        console.log(`Requests set count: ${repeatCount}`);
    })
}
