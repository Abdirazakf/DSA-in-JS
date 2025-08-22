function binarySearch(target,array){
    let position = Math.floor(array.length / 2)
    let mid = array[position]

    if (target == mid){
        return `${target} is in the array`
    }

    if (mid < target){
        return binarySearch(target,array.slice(position + 1, array.length))
    } else if (mid > target){
        return binarySearch(target, array.slice(0, position))
    } else {
        return `${target} is not in the array`
    }
}