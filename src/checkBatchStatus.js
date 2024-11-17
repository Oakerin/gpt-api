import OpenAI from "openai";
import { config } from "../config";
import { getResult } from "./utils/getResult.mjs";
import { checkStatus } from "./utils/checkStatus.mjs";

const openai = new OpenAI({
    apiKey: config.apiKey
});

async function main() {
  const batch_id = 'batch_673926bd8d5c8190ae84409bf365b57b'
  const outputFileName = 'output'
  const batchStatus = await checkStatus(openai, batch_id)

  if (batchStatus.status === 'completed') {
      await getResult(openai, batchStatus, outputFileName)
  }
}

main();