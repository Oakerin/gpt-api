async function createBatch(openai, file) {
  const batch = await openai.batches.create({
    input_file_id: file.id,
    endpoint: "/v1/chat/completions",
    completion_window: "24h"
  });

  console.log('****************************************');
  console.log('*****************BATCH******************');
  console.log('****************************************');
  console.log(batch);
  console.log(batch.status);
  console.log(batch.id);

  return batch
}

export { createBatch }