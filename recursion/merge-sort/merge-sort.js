let array = [3, 2, 1, 13, 8, 5, 0, 1]

function mergeSort(array){
    if (array.length <= 1){
        return array
    }

    let mid = array.length / 2
    let left = mergeSort(array.slice(0,mid))
    let right = mergeSort(array.slice(mid))

    let result = []
    let i = 0
    let j = 0

    while (i < left.length && j < right.length){
        if (left[i] <= right[j]) {
            result.push(left[i])
            i++
        } else {
            result.push(right[j])
            j++
        }
    }

    // Concatenates any remaining numbers in either the left or right arrays
    return result.concat(left.slice(i)).concat(right.slice(j))
}

console.log(mergeSort(array))