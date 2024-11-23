/**
 * 
 * @param {'MULTIPLE' | 'SINGLE'} type 
 * @param {*} userMessages 
 * @param {*} systemMessage 
 * @param {string} model 
 * @returns 
 */
function makeRequests(type = 'SINGLE', userMessages = [], systemMessage, model) {
    let requests

    switch (type) {
        case 'MULTIPLE': 
            requests = userMessages
                .map(userMessage => {
                    return [systemMessage, userMessage]
                })
                .map((messages, i) => {
                    return {"custom_id": `${i}`, "method": "POST", "url": "/v1/chat/completions", "body": {"model": model, "messages": messages, "max_tokens": 1000}}
                })
            break;

        case 'SINGLE':
            requests = [{"custom_id": '1', "method": "POST", "url": "/v1/chat/completions", "body": {"model": model, "messages": [systemMessage, ...userMessages], "max_tokens": 1000}}]
            break;
    
        default:
            requests = []
            break;
    }

    return requests
}

export { makeRequests }