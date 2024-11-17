import OpenAI from "openai";
import { config } from "../config";
import { getResult } from "./utils/getResult.mjs";
import { checkStatus } from "./utils/checkStatus.mjs";
import { createBatch } from "./utils/createBatch.mjs";
import { createFile } from "./utils/createFile.mjs";

const openai = new OpenAI({
    apiKey: config.apiKey
});

const waitTime = 30 * 1000 // msec
const maxRetryCount = 10

async function main() {
  let retryCount = 0
  let intervalId
  const file = await createFile(openai, config.inputFileName)
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
        await getResult(openai, batchStatus, config.outputFileName)
        clearInterval(intervalId);
        // todo convert result
    }
  }, waitTime)

}

main();
