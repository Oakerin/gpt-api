import fs from "fs";

async function createFile(openai, fileName) {
  const file = await openai.files.create({
    file: fs.createReadStream(`./src/inputData/${fileName}.jsonl`),
    purpose: "batch",
  });
  
  console.log('****************************************');
  console.log('*****************FILE*******************');
  console.log('****************************************');
  console.log(file);
  console.log(file.id);

  return file
}

export { createFile }