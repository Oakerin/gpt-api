// Just create a config.mjs file from the template in the same dir and fill the data
export const config = {
    apiKey: '<your_openapi_apiKey>',
    inputFileName: 'batch_input',
    outputFileName: 'batch_output',
    /**
     * requestSetType - SINGLE | MULTIPLE
     * You can choose a request style for the chat gpt:
     * For SINGLE you will generate a one request with your set of messages
     * For MULTIPLE you will generate a set of request with one message in each other
     */
    requestSetType: 'MULTIPLE',
    /**
     * requestSetRepeatCount
     * This option is about how many times you want your request will be repeated
     */
    maxRetryCount: 10,
    retryInterval: 30 * 1000, // msec
    gptModel: 'gpt-4o'
}