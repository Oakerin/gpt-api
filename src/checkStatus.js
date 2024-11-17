import OpenAI from "openai";
import { config } from "../config.mjs";
import { getResult } from "./utils/getResult.mjs";
import { checkStatus } from "./utils/checkStatus.mjs";

const openai = new OpenAI({
    apiKey: config.apiKey
});

async function main() {
  const batch_id = 'batch_6739e16bfccc81908e60864b114458d1'
  const outputFileName = config.outputFileName
  const batchStatus = await checkStatus(openai, batch_id)

  if (batchStatus.status === 'completed') {
      await getResult(openai, batchStatus, outputFileName)
  }
}

main();