// Just create a config.mjs file from the template in the same dir and fill the data
export const config = {
    apiKey: '<your_openapi_apiKey>',
    inputFileName: 'batch_input',
    outputFileName: 'batch_output',
    maxRetryCount: 10,
    retryInterval: 30 * 1000, // msec
    gptModel: 'gpt-4o'
}