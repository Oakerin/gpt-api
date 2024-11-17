import fs from "fs";

async function getResult(openai, batchStatus, outputFileName = 'output') {
    console.log('****************************************');
    console.log('*****************GET RESULT...**********');
    console.log('****************************************');
    const fileResponse = await openai.files.content(batchStatus.output_file_id);
    const fileContents = await fileResponse.text();
  
    console.log(fileContents);
    fs.writeFile(`./src/outputData/${outputFileName}.jsonl`, fileContents, function(error){
      if (error){ 
          return console.log(error);
      }
      console.log('****************************************');
      console.log('**********ФАЙЛ УСПЕШНО ЗАПИСАН**********');
      console.log('****************************************');
    })
}

export { getResult }