async function checkStatus(openai, batchId) {
    const batchStatus = await openai.batches.retrieve(batchId);

    console.log('****************************************');
    console.log('*****************BATCH STATUS***********');
    console.log('****************************************');
    console.log(batchStatus);
    if (batchStatus.errors && batchStatus.errors.data) {
        console.error('****************************************');
        console.error('*****************ERRORS***********');
        console.error('****************************************');
        batchStatus.errors.data.forEach(e => {
          console.log(e)
        }) 
      }
    console.log(batchStatus.status);
    console.log(batchStatus.output_file_id);

    return batchStatus
}

export { checkStatus }