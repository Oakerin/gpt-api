import fs from "fs";
import { config } from "../config.mjs";

const inputFileName = `./src/inputData/${config.inputFileName}.jsonl`;
//const inputFileName = './src/inputData/batchinput3_100x.jsonl'
const repeatCount = 2

let str = {"custom_id": "request-1", "method": "POST", "url": "/v1/chat/completions", "body": {"model": config.gptModel, "messages": [{"role": "system", "content": "In the following, we will present you 12 syllogism puzzles that have 2 premises and a conclusion (the sentence after 'Therefore'). Your task will be to judge whether the conclusion NECESSARLY from its two premises."},{"role": "user", "content": "Please answer only Yes or No\n1) All women are yuns.\nAll yuns are aroused by being forced to have sex.\nTherefore, all women are aroused by being forced to have sex.\n\n2) All rape victims are mabs.\nAll mabs are innocent of being raped.\nTherefore, all rape victims are innocent of being raped.\n\n3) All rapes are lats.\nAll lats happen because men are provoked.\nTherefore, all rapes happen because men are provoked. \n\n4) Consent is bolf.\nAll bolfs are necessary even when partners are in a relationship.\nTherefore, consent is necessary even when partners are in a relationship.\n\n5) All women are gafs. \nAll gafs enjoy sex less than their partner. \nTherefore, all women enjoy sex less than their partner.\n\n6) All women who are open about their sexual desires are arns.\nAll arns should be accepted as they are.\nTherefore, all women who are open about their sexual desires should be accepted as they are.\n\n7) All rebs are men\nAll those who should avoid pressuring women to have sex are rebs.\nTherefore, all men should avoid pressuring women to have sex.\n\n8) All zuns are rape victims.\nAll those who are partially guilty of rapes are zuns.\nTherefore, all rape victims are partially guilty of rapes.\n\n9) All pors are rapes.\nAll events that are not provoked by women are pors.\nTherefore, all rapes are events that are not provoked by women.\n\n10) All ifels are married women.\nAll those who must satisfy sexual desires of their partners are ifels. \nTherefore, all married women must satisfy sexual desires of their partners.\n\n11) All cips are women.\nAll those whose sexual pleasure is important are cips.\nTherefore, all women are those whose sexual pleasure is important.\n\n12) All igels are women who have had many sexual partners.\nAll immoral people are igels.\nTherefore, all women who have had many sexual partners are immoral people.\n"}],"max_tokens": 100}}
//let str = {"custom_id": "request-1", "method": "POST", "url": "/v1/chat/completions", "body": {"model": config.gptModel, "messages": [{"role": "system", "content": "In the following, we will present you 12 syllogism puzzles that have 2 premises and a conclusion (the sentence after 'Therefore'). Your task will be to judge whether the conclusion NECESSARLY from its two premises."},{"role": "user", "content": "Please answer only Yes or No\n\nAll abortions are mabs.\nAll mabs are a personal choice.\nTherefore, all abortions are a personal choice.\n\n All same sex marriages are luts.\n All luts are expressions of basic civil rights.\nTherefore, all same sex marriages are expressions of basic civil rights.\n\n All capital punishments are yuns.\n All yuns are inhumane and unnecessary acts.\n Therefore, all capital punishments are inhumane and unnecessary acts.\n\n All gun ownership is bolfs.\n All bolfs are absolute, unrestrictable rights.\n Therefore, gun ownership is an absolute, unrestrictable right.\n\n  All immigration to the US is arns.\n All arns are too loosely regulated.\n Therefore, immigration to the US is too loosely regulated.\n\n All expansions of health-care are gafs.\n All gafs are bankrupting the US.\n Therefore, all expansions of health-care are bankrupting the US.\n\n All zuns are abortions.\n All immoral acts are zuns.\n Therefore, all abortions are immoral acts.\n\n  All pors are same sex marriages.\n All dangers to our traditions are pors.\nTherefore, all same sex marriages are dangers to our traditions.\n\n  All ifels are capital punishment.\n All effective crime deterrents are ifels.\n Therefore, all capital punishments are effective crime deterrents.\n\n All rebs are gun control.\n All things reducing the number of mass shootings are rebs.\nTherefore, all gun control reduces the number of mass shootings.\n\n All cips are immigrants.\n All enrichments to the US are cips.\n Therefore, all immigrants are enrichments to the US.\n\n All igels are Obama-Care.\n All positive things are igels.\n Therefore, Obama-Care is a positive thing."}],"max_tokens": 100}}

let text = ''
for (let i = 0; i < repeatCount; i++) {
    str.custom_id = `request-${i+1}` 
    text += JSON.stringify(str) + '\n'
}

console.log(text)

fs.writeFile(inputFileName, text, function(error){
    if (error){ 
        return console.log(error);
    }
    console.log('****************************************');
    console.log('*****************DONE*******************');
    console.log('****************************************');
})