// Module that allows user input from console
const readline = require('readline')

function fib (n, array = [0,1], curr = 0){
    for (let i = 1; i < n - 1; i++){
        curr = array[i] + array[i-1]
        array.push(curr)
    }
    return array
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question('Enter a number: ', (num) => {
    console.log(fib(num))
    rl.close()
})