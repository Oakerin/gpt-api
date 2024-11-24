const shuffleArray = (array = [], indexes = []) => {
    // Add indicator
    array = array.map((item, i) => ({ ...item, i }))
    // console.log(array)
    ////

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    ////
    array.forEach(val => { indexes.push(val.i) })
    array = array.map(val => {
        const { i, ...newVal } = val
        return newVal
    })
    ////

    // console.log(indexes)

    return array
}

export { shuffleArray }