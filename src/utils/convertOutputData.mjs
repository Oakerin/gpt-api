const regexp = /yes|no/gi

export function convertOutputData(data, count = 0) {
    let text = ''
    let answers = data
        .map(item => JSON.parse(item).response.body.choices)
        .flat()
        .map(z => [...z.message.content.matchAll(regexp)])

    // Add EOL Symbol 
    for (let i = 0; i < answers.length; i++) {
        text += answers[i] + ' '
        if ((i+1) % count === 0) {
            text += '\n'
        }
    }

    return text
}
