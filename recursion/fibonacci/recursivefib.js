// Module that allows user input from console
const readline = require('readline')

function recursiveFib(n, array = [0,1]){
    if (array.length >= n){
        return array
    } else {
        let nextFib = array[array.length - 1] + array[array.length - 2]
        array.push(nextFib)
        return recursiveFib(n, array)
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question('Enter a number: ', (num) => {
    console.log(recursiveFib(num))
    rl.close()
})