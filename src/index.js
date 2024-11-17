import OpenAI from "openai";
import { config } from "../config.mjs";
import { getResult } from "./utils/getResult.mjs";
import { checkStatus } from "./utils/checkStatus.mjs";
import { createBatch } from "./utils/createBatch.mjs";
import { createFile } from "./utils/createFile.mjs";

const openai = new OpenAI({
    apiKey: config.apiKey
});

const waitTime = config.waitTime
const maxRetryCount = config.maxRetryCount
const inputFileName = config.inputFileName
const outputFileName = config.outputFileName

async function main() {
  let retryCount = 0
  let intervalId
  const file = await createFile(openai, inputFileName)
  const batch = await createBatch(openai, file)

  console.log('****************************************');
  console.log(`***************WAITING ${waitTime / 1000} sec***********`);
  console.log('****************************************');

  intervalId = setInterval(async () => {
    retryCount++;
    if (retryCount >= maxRetryCount) {
      clearInterval(intervalId);
      return;
    }

    console.log(`***************RETRY: ${retryCount} / ${maxRetryCount}***********`);

    const batchStatus = await checkStatus(openai, batch.id)
    if (batchStatus.status === 'completed') {
        await getResult(openai, batchStatus, outputFileName)
        clearInterval(intervalId);
        // todo convert result
    }
  }, waitTime)

}

main();
