function knightmoves(start,end) {
    const moves = [
        [2,1],
        [2,-1],
        [-2,1],
        [-2,-1],
        [1,2],
        [1,-2],
        [-1,2],
        [-1,-2]]
        
    function validPosition(x,y) {
        return x >= 0 && x < 8 && y >= 0 && y < 8
    }
    
    function getMoves(position) {
        const [x,y] = position
        const validMoves = []
        
        for (let [row,col] of moves) {
            let newX = x + row
            let newY = y + col
            
            if (validPosition(newX,newY)) {
                validMoves.push([newX,newY])
            }
        }
        
        return validMoves
    }
    
    const startString = start.toString()
    const endString = end.toString()
    
    if (startString === endString) {
        
        console.log(`Start: [${start}], End: [${end}]`)
        console.log(`You made it in 0 moves! Here's your path:`)
        console.log(start)
        return [start]
    }
    
    const queue = [[start, [start]]]
    
    const visited = []
    visited.push(startString)
    
    while (queue.length > 0) {
        const [current, path] = queue.shift()
        
        const nextPosition = getMoves(current)
        
        for (const next of nextPosition) {
            const nextString = next.toString()
            
            if (nextString === endString) {
                const final = [...path, next]
                
                console.log(`Start: [${start}], End: [${end}]`)
                console.log(`You made it in ${final.length - 1} moves! Here's your path:`)
                
                final.forEach(position => {
                    console.log(position)
                })
                return [...path, next]
            }
            
            if (!visited.includes(nextString)) {
                visited.push(nextString)
                
                queue.push([next, [...path, next]])
            }
        }
    }
    
    return null
}

knightmoves([1,2],[6,7])