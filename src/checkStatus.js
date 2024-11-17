import OpenAI from "openai";
import { config } from "../config.mjs";
import { getResult } from "./utils/getResult.mjs";
import { checkStatus } from "./utils/checkStatus.mjs";

const openai = new OpenAI({
    apiKey: config.apiKey
});

async function main() {
  let batch_id

  try {
    batch_id = process.argv.slice(2)[0]
  } catch (e) {
    console.log(e)
  }

  if (batch_id == null) {
    throw new Error('batch_id is not defined')
  }

  const outputFileName = config.outputFileName
  const batchStatus = await checkStatus(openai, batch_id)

  if (batchStatus.status === 'completed') {
      await getResult(openai, batchStatus, outputFileName)
  }
}

main();