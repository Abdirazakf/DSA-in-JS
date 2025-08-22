function binarySearch(target,array){
    let position = Math.floor(array.length / 2)
    let mid = array[position]

    if (target == mid){
        return `${target} is in the array`
    }

    if (target > mid){
        return binarySearch(target,array.slice(0,mid))
    } else if (target < mid){
        return binarySearch(target, array.slice(mid + 1, array.length))
    } else {
        return `${target} is not in the array`
    }
}