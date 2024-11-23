import fs from "fs";

async function getResult(openai, batchStatus, outputFileName = 'output') {
    const outputFileSrc = `./src/outputData/${outputFileName}.jsonl`;
    let fileResponse

    console.log('****************************************');
    console.log('*****************GET RESULT...**********');
    console.log('****************************************');
    if (batchStatus.output_file_id != null) {
      fileResponse = await openai.files.content(batchStatus.output_file_id);
    } else {
      console.log('\n****************************************');
      console.log('************AN ERROR WAS FOUND**********');
      console.log('************GENERATE A LOG FILE*********');
      console.log('****************************************');
      fileResponse = await openai.files.content(batchStatus.error_file_id);
    }

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