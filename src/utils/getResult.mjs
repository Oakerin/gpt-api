import fs from "fs";

async function getResult(openai, batchStatus, outputFileName = 'output') {
    const outputFileSrc = `./src/outputData/${outputFileName}.jsonl`;

    console.log('****************************************');
    console.log('*****************GET RESULT...**********');
    console.log('****************************************');
    const fileResponse = await openai.files.content(batchStatus.output_file_id);
    const fileContents = await fileResponse.text();
    console.log('');

    fs.writeFile(outputFileSrc, fileContents, function(error){
      if (error){ 
          return console.log(error);
      }
      console.log('****************************************');
      console.log('*****************DONE*******************');
      console.log('****************************************');
      console.log(`Output file: ${outputFileSrc} was created`);
    })
}

export { getResult }